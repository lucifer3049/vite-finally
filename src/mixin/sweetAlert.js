import Swal from "sweetalert2";

export default {
    typicalType(title, text, icon, showConfirmButton) {
        return Swal.fire({
            title,  //彈跳視窗的標題
            text,   //彈跳視窗的文本
            icon, //圖標
            showConfirmButton, //控制按鈕關閉的設置為false時將顯示取消按鈕，用戶可以單擊該按鈕來取消視窗
            confirmButtonText: `繼續→`, //更改確認按鈕上的文本
            confirmButtonColor: '#02C874', //更改按鈕顏色
            timer: showConfirmButton === true ? '' : 1500//控制視窗時間到自動消失
        })
    },
    doubleConfirm(title, text, confirmCallback, cancelCallback) {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b09e63',
            cancelButtonColor: '#000000',
            confirmButtonText: '是的, 刪除它!',
            cancelButtonText: '取消',
        }).then((result) => {
            if (result.isConfirmed) {
                confirmCallback();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                cancelCallback();
            }
        });
    },
}