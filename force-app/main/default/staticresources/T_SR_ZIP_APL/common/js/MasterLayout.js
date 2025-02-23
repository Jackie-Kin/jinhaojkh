
/**
 * @fileoverview 共通のユーティリティ
 */

spmMasterLayout = function () {
};

/*
 * 処理中パネルを表示する
 */
spmMasterLayout.LoadStart = function (context) {

  if (!context) {

    context = document.body;
  }

  $(".loading", context).first().show();
}

/*
 * 処理中パネルを非表示する
 */
spmMasterLayout.LoadEnd = function (context) {

  if (!context) {

    context = document.body;
  }

  $(".loading", context).first().hide();
}