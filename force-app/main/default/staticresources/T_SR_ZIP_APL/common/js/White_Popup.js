
 /*-------------------------------
 イベント処理「white_popup」を定義
 --------------------------------*/
var callBackFunc = {};

function white_popup(src,parameter,options,kinouId){
  //読み込む外部ファイルを取得しておく
  callBackFunc[kinouId] = options.onClose;  //callBackFunc = options.onClose;

  //URLパラメータの作成と遷移先を設定
  var poplink = src + "?" + $.param(parameter);  var whiteGrayId   = 'white_gray' + kinouId;
  var whiteSquareId = 'white_square' + kinouId;
  var whitePopupId  = 'white_popup' + kinouId
  var whiteDragId = 'DragDivtag' + kinouId

  if($('.white_gray').length){
     $('.white_gray').last().removeClass('white_opacity');
     $('.white_gray').last().addClass('white_opacityNone');
  }
  
  //要素を作成  $('<div id="' + whiteGrayId + '" class="white_gray white_opacity"></div>').appendTo($('#white_main'));

  //グレー背景をフェードインで表示
  $('#' + whiteGrayId)
    .fadeIn("slow")
   .css("display","block");

  //iFrame用タグを埋め込み  $('<div id="'+ whiteSquareId + '" class="white_square"><iframe id="' + whitePopupId + '" name="white_popup" class="white_popup" allowtransparency="true" frameborder=0 ></iframe></div>').appendTo($('#white_main'))
  .css('display','none');

  //ポップアップ表示領域のスタイル定義
  $('#' + whiteSquareId)
   .fadeIn("slow")
   .css({
    "position" :"fixed",

    "width"  :$(window).width(),

    "height"  :$(window).height(),
    "display" :"block",
    "overflow" :"hidden",

   });
  $('#' + whitePopupId)
   //ポップアップ内に外部ファイルを読み込む
   .attr('src',poplink)
   .css({
    "position" :"fixed",

    "width"  :$(window).width(),

    "height"  :$(window).height(),
    "display" :"block",
    "overflow" :"hidden"
   });
  //ポップアップを画面中央位置になるよう、位置関係を算出
  var leftposition = Math.floor(($(window).width() - $('#' + whiteSquareId).width()) / 2);
  var topposition = Math.floor(($(window).height() - $('#' + whiteSquareId).height()) / 2);

  // 中央配置
  // 中央配置後の位置を取得して直接設定
  $('#' + whiteSquareId).css('left', leftposition);
  $('#' + whiteSquareId).css('top', topposition);

  $('#' + whiteDragId)
   .fadeIn("slow")
   .css({

    "position" :"fixed",

    "width"  :$('#' + whiteSquareId).width() - 40,

    "height"  :'45px',

    "z-index" : "500"
   });
   
   // ドラッグ設定
   $('#' + whiteSquareId).draggable({
       containment: 'body'
   });


  //表示完了呼び出し関数があれば実施する
  if(options.onLoadComplete !== null && typeof options.onLoadComplete !== 'undefined'){
      $('#' + whitePopupId).load(function(response, status, xhr){
		console.log(response);
		console.log(status);
		options.onLoadComplete();});
  }else if(options.onFinal !== null && typeof options.onFinal !== 'undefined'){
      $('#' + whitePopupId).load(function(response, status, xhr){
		console.log(response);
		console.log(status);
		options.onFinal();});
  }
  //クリックして別窓表示という本来の動作をキャンセル

  return false;
 };
 /*-------------------------------
 イベント処理「white_popup_close」を定義
 --------------------------------*/
 //作成したグレーアウト、iframe、表示領域をフェードアウトさせて削除する
 function white_popup_close(kinouId,param){
  $('#white_gray' + kinouId + ',#white_popup' + kinouId + ',#white_square' + kinouId)
   .fadeOut("slow")
   .remove();
   $('.white_gray').last().removeClass('white_opacityNone');
   $('.white_gray').last().addClass('white_opacity');

   if(callBackFunc[kinouId] != null){
       callBackFunc[kinouId](param);
   }
 };