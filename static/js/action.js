const close_button = document.getElementById('close-bt');
const cancle_button = document.getElementById('cancle-bt');
const modal_container = document.getElementById('modal-container');
//  thiết lập chiều dài bằng chiều rộng khi chiều rộng là biến thiên 
        // đặt id-a0001 là biến x
        const x = document.getElementById('a0001');
        // Lấy chiều cao div  id-0001
        const y = x.clientHeight ;
        // Thiết lập chiều rộng của nút id-a0002 bằng chiều cao của div id-0001r
        document.getElementById('a0001').style.width = y + 'px';
        document.getElementById('a0001').style.height = y + 'px';

        //tương tự với id-a0002
        
        const m = document.getElementById('a0002');
        const n = m.clientHeight ;
        document.getElementById('a0002').style.width = n + 'px';
        document.getElementById('a0002').style.height = n + 'px';
var button = document.getElementById('moveButton');

// Biến lưu trữ vị trí chuột khi bắt đầu di chuyển
var startX, startY;

// Biến lưu trữ vị trí ban đầu của nút
var startLeft, startTop;

// Bắt sự kiện khi chuột được nhấn xuống trên nút
button.addEventListener('mousedown', function(e) {
    // Lưu trữ vị trí chuột khi bắt đầu di chuyển
    startX = e.clientX;
    startY = e.clientY;

    // Lưu trữ vị trí ban đầu của nút
    startLeft = button.offsetLeft;
    startTop = button.offsetTop;

    // Bắt sự kiện khi di chuyển chuột
    document.addEventListener('mousemove', onMouseMove);
});

// Bắt sự kiện khi chuột được nhả ra
document.addEventListener('mouseup', function() {
    // Hủy bỏ sự kiện di chuyển chuột
    document.removeEventListener('mousemove', onMouseMove);
});

// Hàm xử lý sự kiện di chuyển chuột
function onMouseMove(e) {
    // Tính toán khoảng cách di chuyển
    var deltaX = e.clientX - startX;
    var deltaY = e.clientY - startY;

    // Cập nhật vị trí mới của nút
    button.style.left = startLeft + deltaX + 'px';
    button.style.top = startTop + deltaY + 'px';
}

// Bắt sự kiện khi nút được nhấn
button.addEventListener('click', function(e) {
    // Kiểm tra xem nút có đang di chuyển hay không
    if (Math.abs(startX - e.clientX) > 5 || Math.abs(startY - e.clientY) > 5) {
        return; // Nếu nút đang di chuyển, không thực hiện hành động click
    }
    modal_container.classList.remove("opacity-0","pointer-events-none");
    modal_container.classList.add("opacity-1" , "pointer-events-auto");
    
});
close_button.addEventListener('click', function() {
    modal_container.classList.remove("opacity-1","pointer-events-auto");
    modal_container.classList.add("opacity-0" , "pointer-events-none");
});
cancle_button.addEventListener('click', function() {
    modal_container.classList.remove("opacity-1","pointer-events-auto");
    modal_container.classList.add("opacity-0" , "pointer-events-none");
});




