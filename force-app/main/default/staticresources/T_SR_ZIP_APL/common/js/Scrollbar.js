/**
 * @fileoverview 共通のScrollbar
 */

spmScrollbar = function () {
};

/**
 * Scrollbar 初期化
 */
spmScrollbar.set = function (id) {
    $(id).TrackpadScrollEmulator();
};
