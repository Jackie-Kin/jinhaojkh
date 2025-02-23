/**
 * @fileoverview ページネーション共通部品
 *
 * ページの切り替えを行う共通部品。
 *
 * ■利用方法
 *   1. Pagination.css と Pagination.js の参照
 *     @section styles{
 *       @Html.Css("~/Areas/Common/Content/Pagination.css")
 *     }
 *     @section scripts{
 *       @Html.Js("~/Areas/Common/Scripts/Pagination.js")
 *     }
 *
 *   2. ページ切り替えを行う場所に ID を設定した div 要素を配置
 *     <div id="targetID"></div>
 *
 *   3. 初期化
 *     $('#targetID').spmPagination({
 *       totalRows: 35,                // 合計行数
 *       visibleRows: 10,              // 1ページに表示する行数(全件数のみ表示の場合は常に1を指定)
 *       visiblePages: 5,              // ページリンクを表示する数
 *       initiateStartPageClick: true, // 初期化時にコールバック関数を呼ぶか否か。省略時はtrue
 *       totalRowsOnly: false, 　      // 全件数のみ表示とするか。省略時はfalse
 *       onPageClick: function (event, page) {
 *         //ページ変更時の処理を記述
 *         console.info('ページ' + page  + 'に移動');
 *       },
 *       onPageCheck: function (event, page) {
 *         //ページ変更前処理を記述		
 *         spmDialog.confirm( 'ページ変更しますか？' , null, null,		
 *         function (arg) {	
 *           $('#targetID').spmPagination('show', page);
 *           console.info('ページ' + page  + 'に移動');
 *         }, function (arg) {	
 *           console.info('ページ変更キャンセル'');
 *         });	
 *       }
 *     });
 *
 *   4. 合計行数変更時は、一度破棄処理を行った後で再度初期化を行う
 *     $('#targetID').spmPagination('destroy');
 *     $('#targetID').spmPagination({
 *       totalRows: 1,                 // 合計行数
 *       visibleRows: 10,              // 1ページに表示する行数(全件数のみ表示の場合は常に1を指定)
 *       visiblePages: 5,              // ページリンクを表示する数
 *       initiateStartPageClick: true, // 初期化時にコールバック関数を呼ぶか否か。省略時はtrue
 *       totalRowsOnly: false, 　      // 全件数のみ表示とするか。省略時はfalse
 *       onPageClick: function (event, page) {
 *         //ページ変更時の処理を記述
 *         console.info('ページ' + page  + 'に移動');
 *       },
 *       onPageCheck: function (event, page) {
 *         //ページ変更前処理を記述		
 *         spmDialog.confirm( 'ページ変更しますか？' , null, null,		
 *         function (arg) {	
 *           $('#targetID').spmPagination('show', page);
 *           console.info('ページ' + page  + 'に移動');
 *         }, function (arg) {	
 *           console.info('ページ変更キャンセル'');
 *         });	
 *       }
 *     });
 */

(function ($, window, document, undefined) {

  'use strict';

  var old = $.fn.spmPagination;

  // PROTOTYPE AND CONSTRUCTOR

  var SpmPagination = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.spmPagination.defaults, options);

    // 合計行数の値確認
    this.options.totalRows = parseInt(this.options.totalRows);
    if (isNaN(this.options.totalRows)) {
      throw new Error('Total rows option is not correct!');
    }

    if (this.options.totalRows < 0) {
      throw new Error('Total rows option is not correct!');
    }

    // 表示行数の値確認
    this.options.visibleRows = parseInt(this.options.visibleRows);
    if (isNaN(this.options.visibleRows)) {
      throw new Error('Visible rows option is not correct!');
    }

    if (this.options.visibleRows < 1) {
      throw new Error('Visible rows option is not correct!');
    }

    // 合計行数、表示行数から合計ページ数を計算する
    if (this.options.totalRows == 0) {
      this.options.totalPages = 1;
    } else {
      this.options.totalPages = Math.floor((this.options.totalRows - 1) / this.options.visibleRows + 1);
    }

    if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
      throw new Error('Start page option is incorrect');
    }

    this.options.totalPages = parseInt(this.options.totalPages);
    if (isNaN(this.options.totalPages)) {
      throw new Error('Total pages option is not correct!');
    }

    this.options.visiblePages = parseInt(this.options.visiblePages);
    if (isNaN(this.options.visiblePages)) {
      throw new Error('Visible pages option is not correct!');
    }

    if (this.options.onPageClick instanceof Function) {
      this.$element.first().on('page', this.options.onPageClick);
    }

    if (this.options.onPageCheck instanceof Function) {
      this.$element.first().on('pageCheck', this.options.onPageCheck);
    }

    // hide if only one page exists
    if (this.options.hideOnlyOnePage && this.options.totalPages == 1) {
      this.$element.trigger('page', 1);
      return this;
    }

    if (this.options.totalPages < this.options.visiblePages) {
      this.options.visiblePages = this.options.totalPages;
    }

    if (this.options.href) {
      this.options.startPage = this.getPageFromQueryString();
      if (!this.options.startPage) {
        this.options.startPage = 1;
      }
    }

    var tagName = (typeof this.$element.prop === 'function') ?
        this.$element.prop('tagName') : this.$element.attr('tagName');

    if (tagName === 'UL') {
      this.$listContainer = this.$element;
    } else {
      this.$listContainer = $('<ul></ul>');
    }

    this.$listContainer.addClass(this.options.paginationClass);

    if (tagName !== 'UL') {
      this.$label = $('<span class="spm-pagination-label"></span>');
      this.$element.append(this.$label);
      this.$element.append(this.$listContainer);
    }

    if (this.options.initiateStartPageClick) {
      this.show(this.options.startPage);
    } else {
      this.currentPage = this.options.startPage;
      this.render(this.getPages(this.options.startPage));
      this.setupEvents();
    }

    return this;
  };

  SpmPagination.prototype = {

    constructor: SpmPagination,

    destroy: function () {
      this.$element.empty();
      this.$element.removeData('spm-pagination');
      this.$element.off('page');
      this.$element.off('pageCheck');

      return this;
    },

    show: function (page) {
      if (page < 1 || page > this.options.totalPages) {
        throw new Error('Page is incorrect.');
      }
      this.currentPage = page;

      this.render(this.getPages(page));
      this.setupEvents();

      this.$element.trigger('page', page);

      return this;
    },

    enable: function () {
      this.show(this.currentPage);
    },

    disable: function () {
      var _this = this;
      this.$listContainer.off('click').on('click', 'li', function (evt) {
        evt.preventDefault();
      });
      this.$listContainer.children().each(function () {
        var $this = $(this);
        if (!$this.hasClass(_this.options.activeClass)) {
          $(this).addClass(_this.options.disabledClass);
        }
      });
    },

    buildListItems: function (pages) {
      var listItems = [];

      if (this.options.first) {
        listItems.push(this.buildItem('first', 1));
      }

      if (this.options.prev) {
        var prev = pages.currentPage > 1 ? pages.currentPage - 1 : this.options.loop ? this.options.totalPages : 1;
        listItems.push(this.buildItem('prev', prev));
      }

      if (!this.options.totalRowsOnly) {
        if (pages.numeric[0] > 1) {
          listItems.push(this.buildItem('omit', pages.numeric[0] - 1));
        } else {
          //非表示ダミー項目
          listItems.push(this.buildItem('omitdammy', 1));
        }
      }

      for (var i = 0; i < pages.numeric.length; i++) {
        listItems.push(this.buildItem('page', pages.numeric[i]));
      }
      
      if (!this.options.totalRowsOnly) {
        if (pages.numeric[pages.numeric.length - 1] < this.options.totalPages) {
          listItems.push(this.buildItem('omit', pages.numeric[pages.numeric.length - 1] + 1));
        } else {
          //非表示ダミー項目
          listItems.push(this.buildItem('omitdammy', 1));
        }
      }

      if (this.options.next) {
        var next = pages.currentPage < this.options.totalPages ? pages.currentPage + 1 : this.options.loop ? 1 : this.options.totalPages;
        listItems.push(this.buildItem('next', next));
      }

      if (this.options.last) {
        listItems.push(this.buildItem('last', this.options.totalPages));
      }

      return listItems;
    },

    buildItem: function (type, page) {
      var $itemContainer = $('<li></li>'),
          $itemContent = $('<a></a>'),
          itemText = this.options[type] ? this.makeText(this.options[type], page) : page;

      if (type == 'omit' || type == 'omitdammy') {
        itemText = '…';
      }

      $itemContainer.addClass(this.options[type + 'Class']);
      $itemContainer.data('page', page);
      $itemContainer.data('page-type', type);

      if (type == 'page') {
        $itemContainer.append($itemContent.attr('href', this.makeHref(page)).addClass(this.options.anchorClass).html(itemText));
      } else {
        $itemContainer.append($itemContent.attr('href', this.makeHref(page)).addClass(this.options.anchorClass).html('<div></div>'));
      }

      return $itemContainer;
    },

    getPages: function (currentPage) {
      var pages = [];

      var half = Math.floor(this.options.visiblePages / 2);
      var start = currentPage - half + 1 - this.options.visiblePages % 2;
      var end = currentPage + half;

      // handle boundary case
      if (start <= 0) {
        start = 1;
        end = this.options.visiblePages;
      }
      if (end > this.options.totalPages) {
        start = this.options.totalPages - this.options.visiblePages + 1;
        end = this.options.totalPages;
      }

      var itPage = start;
      while (itPage <= end) {
        pages.push(itPage);
        itPage++;
      }

      return { "currentPage": currentPage, "numeric": pages };
    },

    render: function (pages) {
      var _this = this;
      this.$listContainer.children().remove();
      var items = this.buildListItems(pages);
      $.each(items, function (key, item) {
        _this.$listContainer.append(item);
      });

      if (this.$label) {
        var label = '全' + _this.options.totalRows + '件'
        if (!_this.options.totalRowsOnly) {
          //通常表示の場合は、現在の表示ページも表示
          + ' | ' + pages.currentPage + '/' + _this.options.totalPages + 'ページ'
          if (_this.options.totalRows != 0) {
            var st = (pages.currentPage - 1) * _this.options.visibleRows + 1;
            var ed = Math.min(pages.currentPage * _this.options.visibleRows, _this.options.totalRows);
            label += '(' + st + '-' + ed + '件)';
          }
        }
        this.$label.text(label);
      }

      this.$listContainer.children().each(function () {
        var $this = $(this),
            pageType = $this.data('page-type');

        switch (pageType) {
          case 'page':
            if ($this.data('page') === pages.currentPage) {
              $this.addClass(_this.options.activeClass);
            }
            break;
          case 'first':
            $this.toggleClass(_this.options.disabledClass, pages.currentPage === 1);
            break;
          case 'last':
            $this.toggleClass(_this.options.disabledClass, pages.currentPage === _this.options.totalPages);
            break;
          case 'omitdammy':
            $this.toggleClass(_this.options.disabledClass, true);
            break;
          case 'prev':
            $this.toggleClass(_this.options.disabledClass, !_this.options.loop && pages.currentPage === 1);
            break;
          case 'next':
            $this.toggleClass(_this.options.disabledClass,
                !_this.options.loop && pages.currentPage === _this.options.totalPages);
            break;
          default:
            break;
        }

      });
    },

    setupEvents: function () {
      var _this = this;
      this.$listContainer.off('click').on('click', 'li', function (evt) {
        var $this = $(this);
        if ($this.hasClass(_this.options.disabledClass) || $this.hasClass(_this.options.activeClass)) {
          return false;
        }
        
        // Prevent click event if href is not set.
        !_this.options.href && evt.preventDefault();

        var page = parseInt($this.data('page'));
        if (_this.options.onPageCheck instanceof Function) {
          _this.$element.trigger('pageCheck', page);
          return true;
        }

        _this.show(page);

      });
    },

    makeHref: function (page) {
      return this.options.href ? this.generateQueryString(page) : "#";
    },

    makeText: function (text, page) {
      return text.replace(this.options.pageVariable, page)
          .replace(this.options.totalPagesVariable, this.options.totalPages)
    },
    getPageFromQueryString: function (searchStr) {
      var search = this.getSearchString(searchStr),
          regex = new RegExp(this.options.pageVariable + '(=([^&#]*)|&|#|$)'),
          page = regex.exec(search);
      if (!page || !page[2]) {
        return null;
      }
      page = decodeURIComponent(page[2]);
      page = parseInt(page);
      if (isNaN(page)) {
        return null;
      }
      return page;
    },
    generateQueryString: function (pageNumber, searchStr) {
      var search = this.getSearchString(searchStr),
          regex = new RegExp(this.options.pageVariable + '=*[^&#]*');
      if (!search) return '';
      return '?' + search.replace(regex, this.options.pageVariable + '=' + pageNumber);

    },
    getSearchString: function (searchStr) {
      var search = searchStr || window.location.search;
      if (search === '') {
        return null;
      }
      if (search.indexOf('?') === 0) search = search.substr(1);
      return search;
    },
    getCurrentPage: function () {
      return this.currentPage;
    }
  };

  // PLUGIN DEFINITION

  $.fn.spmPagination = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    var methodReturn;

    var $this = $(this);
    var data = $this.data('spm-pagination');
    var options = typeof option === 'object' ? option : {};

    if (!data) $this.data('spm-pagination', (data = new SpmPagination(this, options)));
    if (typeof option === 'string') methodReturn = data[option].apply(data, args);

    return (methodReturn === undefined) ? $this : methodReturn;
  };

  $.fn.spmPagination.defaults = {
    totalRows: 0,
    visibleRows: 10,
    totalPages: 1,
    startPage: 1,
    visiblePages: 5,
    initiateStartPageClick: true,
    totalRowsOnly: false,
    hideOnlyOnePage: false,
    href: false,
    pageVariable: '{{page}}',
    totalPagesVariable: '{{total_pages}}',
    page: null,
    first: '　',
    prev: '　',
    next: '　',
    last: '　',
    loop: false,
    onPageCheck: null,
    onPageClick: null,
    paginationClass: 'spm-pagination',
    nextClass: 'spm-page-item next',
    prevClass: 'spm-page-item prev',
    lastClass: 'spm-page-item last',
    firstClass: 'spm-page-item first',
    omitClass: 'spm-page-item omit',
    omitdammyClass: 'spm-page-item omitdammy',
    pageClass: 'spm-page-item spm-page-number',
    activeClass: 'active',
    disabledClass: 'disabled',
    anchorClass: 'spm-page-link'
  };

  $.fn.spmPagination.Constructor = SpmPagination;

  $.fn.spmPagination.noConflict = function () {
    $.fn.spmPagination = old;
    return this;
  };

  $.fn.spmPagination.version = "1.4.1";

})(window.jQuery, window, document);
