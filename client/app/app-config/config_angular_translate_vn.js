(function () {
  'use strict';

  angular.module('tdpharmaClientApp')
      .config(angularTranslateConfig);

  angularTranslateConfig.$inject = ['$translateProvider'];

  function angularTranslateConfig($translateProvider) {

      
    $translateProvider.translations('vi', {      
      GREETING: 'Allo, Allo!',
      LEADING_GREETING: 'Kích hoạt nhà thuốc của bạn với Pharmaplus',
      HOME: 'Trang chủ',
      INVENTORY: 'Tồn Kho',
      ORDERS: 'Hoá Đơn',
      CHECKOUT: 'Bán Thuốc',
      SIGNUP: 'Đăng Ký',
      REGISTER: 'Đăng Ký',
      LOGIN: 'Đăng Nhập',
      LOGOUT: 'Đăng xuất',
      EMAIL: 'Email',
      PASSWORD: 'Mật Mã',
      LOGIN_FORM_USER_PASSWORD_ERR: 'Xin vui lòng cung cấp email và mật mã của bạn.',
      PASSWORD_CHANGE_TITLE: 'Cập Nhập Mật Mã',
      CURRENT_PASSWORD: 'Mật Mã Hiện Tại',
      NEW_PASSWORD: 'Mật Mã Mới',
      PASSWORD_LENGTH_REQUIREMENT: 'Mật mã phải có ít nhất 8 ký tự',
      SAVE_CHANGES: 'Lưu Lại',
      TOASTR_CONGRATS: 'Chúc mừng!',
      TOASTR_SORRY: 'Sorry!',
      TOASTR_CREATED: ' đã được tạo thành công',
      PASSWORD_CHANGE_SUCCESS: 'Mật mã của bạn đã cập nhật thành công',
      INCORRECT_PASSWORD: 'Mật mã hiện tại không đúng',
      NEXT: 'Tiếp tục',
      DRAG_IMAGE: 'Kéo hình vào vùng màu xám để đi kèm',
      // Image processing message
      PROCESSING_IMAGE: 'Hiện đang phân tích hình ảnh...',
      UPLOADING_IMAGE: 'Hiện đang truyền tải hình ảnh lên...',
      PROCESSING_IMAGE_TIMEOUT: 'Phân tích hình ảnh quá lâu',
      SUPPORT_IMAGE_FILE: 'File hình ảnh được hỗ trợ là: ',
      // Category related pages
      SELECT_A_CATEGORY: 'Chọn thể loại',
      'Baby & Kids': 'Trẻ em & Sơ sinh',
      'Beauty & Skincare': 'Đẹp & Dưỡng da',
      'Personal Care': 'Chăm sóc cá nhân',
      'Diet & Fitness': 'Ăn kiêng & Thể dục',
      'Medicine & Health': 'Thuốc bệnh & Sức khoẻ',
      'Vitamin & Supplement': 'Vitamin & Bỗ dưỡng',
      'Diapering & Potty': 'Vệ sinh của bé',
      'Bath & Skincare' : 'Tắm rửa & Dưỡng da bé',
      'Formula & Baby Food': 'Thức ăn của bé',
      'Feeding & Mealtime': 'Vật dụng ăn cho bé',
      'Baby Gear': 'An toàn của bé',
      'Children\'s Medicine \& Health': 'Thuốc bệnh cho bé',
      'Bath & Body': 'Tắm rửa & Cơ thể',
      'Eye Cosmetics': 'Mỹ phẩm mắt',
      'Foundation, Blush & Bronzer': 'Phấn kem nền, má hồng, tạo khối',
      'Lipsticks & Lip Balm': 'Son môi & Dưỡng môi',
      'Sun Care': 'Chăm sóc chống nắng',
      'Skincare Oils & Supplements': 'Dầu kem dưỡng da',
      'Facial Skincare': 'Chăm sóc da mặt',
      'Hair Care': 'Chăm sóc tóc',
      'Oral Care': 'Chăm sóc răng',
      'Eye Care': 'Chăm sóc mắt',
      'Feminine Care': 'Vệ sinh phụ nữ',
      'Antiperspirant & Deodorant': 'Khử mùi và mồ hôi',
      'Bladder Protection & Incontinence': 'Vệ sinh bàng quang',
      'Cotton Balls & Swabs': 'Gạc & Bông gòn',
      'Wipes & Hand Sanitizers': 'Vệ sinh tay',
      'Family Planning': 'Kế hoạch gia đình',
      'Nutrition': 'Dinh dưỡng',
      'Weight Management': 'Quản lý cân nặng',
      'Sports Supplements': 'Bồi dưỡng thể thao',
      'Supplements': 'Bồi dưỡng',
      'Digestion': 'Tiêu hoá',
      'Pain & Fever': 'Đau sốt',
      'First Aid': 'Sơ cứu',
      'Cough, Cold & Flu': 'Cảm lạnh & Ho',
      'Allergy & Sinus': 'Dị ứng & Hô hấp',
      'Hemorrhoid & Piles Treatment': 'Điều trị trĩ cọc',
      'Diabetes': 'Tiểu đường',
      'Sleeping': 'Giấc ngũ',
      'Women\'s Health': 'Sức khoẻ phụ nữ',
      'Multivitamins': 'Vitamin tổng hợp',
      'Calcium & Minerals': 'Calcium & Khoáng sản',
      'Fish Oils & Omegas': 'Dầu cá omega',
      'Enzymes': 'Enzymes',
      'Bee Supplements': 'Bổ dưỡng mật ong',
      'Vitamin': 'Vitamin',
      'Greens & Antioxidants': 'Thực phẫm chức năng',
      'Mushrooms': 'Nấm',
      // Add product page
      SELECT_USER: 'Chọn người làm',
      ADD_PRODUCT_DETAIL: 'Chi Tiết',
      AMOUNT: 'Số Lượng',
      AUTHOR: 'Người lưu',
      NAME: 'Tên',
      CONCENTRATION: 'Cường Độ',
      CONCENTRATION_UNIT: 'Đơn vị cường độ',
      MEDICINE_FORM: 'Dạng Thuốc',
      MFG_LOCATION: 'Nước Sản Xuất',
      MANUFACTURER: 'Công ty Sản Xuất',
      MANUFACTURE_DATE: 'Ngày Sản Xuất',
      EXPIRE_DATE: 'Ngày Hết Hạn',
      PACKAGE: 'Cách Đóng Gói',
      AMOUNT_PER_PACKAGE: 'Số lượng/Gói',
      NUM_PACKAGE: 'Số Gói',
      UNIT: 'Đơn vị',
      TOTAL: 'Tổng số lượng',
      PURCHASE_PRICE: 'Giá mua',
      SALE_PRICE: 'Giá bán',      
      SAVE: 'Lưu Lại',
      AUTHOR_REQUIRED: 'Người lưu là mục cần thiết',
      NAME_REQUIRED: 'Tên là mục cần thiết',
      CONCENTRATION_REQUIRED: 'Cường độ là mục cần thiết',
      CONCENTRATION_UNIT_REQUIRED: 'Đơn vị cường độ là mục cần thiết',
      MFG_LOCATION_REQUIRED: 'Nước sản xuất là mục cần thiết',
      MANUFACTURER_REQUIRED: 'Công ty sản xuất là mục cần thiết',
      MFG_DATE_REQUIRED: 'Ngày sản xuất là mục cần thiết',
      EXPIRE_DATE_REQUIRED: 'Ngày hết hạn là mục cần thiết',
      PACKAGE_REQUIRED: 'Cách đóng gói là mục cần thiết',
      AMOUNT_PER_PKG_REQUIRED: 'Số lượng/Gói là mục cần thiết',
      NUM_PACKAGE_REQUIRED: 'Số gói là mục cần thiết',
      TOTAL_UNITS_REQUIRED: 'Tổng số lượng là mục cần thiết',
      PRICE_REQUIRED: 'Giá mua là mục cần thiết',
      CATEGORY_REQUIRED: 'Thể loại là mục cần thiết. Xin quay lại chọn thể loại',
      'On Sale': 'Đang bán',
      'Off Sale': 'Hết bán',
      ADD_A_PRODUCT: 'Nhập sản phẩm mới',
      SEARCH: 'Tìm kiếm',
      SEARCH_FOR: 'Tìm kiếm tên sản phẩm',
      STATUS: 'Trạng thái',
      CATEGORY: 'Thể loại',
      Price: 'Giá tiền',
      QUANTITY: 'Số lượng',
      ACTION: 'Hành động',
      ITEMS: 'Sản phẩm',
      EDIT: 'Cập nhật',
      ADD_ITEM: 'Nhập hàng',
      STOP_SALE: 'Dừng bán',
      EDIT_PRICE: 'Đổi Giá',
      FILTER: 'Phân lọc',
      FIRST: 'Trang Đầu',
      LAST: 'Trang Cuối',
      'Track your inventory...': 'Quản lý tồn kho...',
      'Manage your store...': 'Quản lý cửa hàng...',
      'Track your sales and purchases...': 'Theo dõi giao dịch mua bán...',
      'Effective Point of Sale...': 'Giao diện mua bán hiệu quả...',
      'Real time Price Control...': 'Quản lý giá thị trường live...',
      'FEATURES': 'Chức năng',
      'NEW_PURCHASE_RECEIPT': 'Tạo đơn nhập',
      'DATE': 'Ngày tháng',
      'SEARCH_FOR_MEDICINE_TO_ADD': 'Tìm kiếm sản phẩm để nhập hàng',
      'Enter the medicine name that needs to be supplied here': 'Vui lòng điền tên thuốc cần nhập dưới đây',
      'PURCHASES_RECEIPT': 'Hoá đơn nhập',
      'SALES_RECEIPT': 'Hoá đơn bán',
      'ADJUSTMENTS_RECEIPT': 'Hoá đơn chỉnh sửa',
      'BACK': 'Trở về',
      'PURCHASE': 'Đơn nhập',
      'SALE': 'Đơn bán',
      'ADJUSTMENT': 'Đơn chỉnh sữa',
      'PAID': 'Đã trả tiền',
      'FULFILL': 'Hoàn thành',
      'PAY': 'Trả tiền',
      'true': 'có',
      'false': 'không',
      'UPDATED_AT': 'Cập nhật lúc',
      'CANCEL': 'Huỷ Bỏ',
      'NOTE': 'Ghi chú / Giải thích',
      'DELETE': 'Xoá Bỏ',
      'EXPLANATION_REQUIRED': 'Ghi chú là mục cần thiết',
      'DUE_DATE': 'Ngày trả tiền',
      'DUE_DATE_REQUIRED': 'Ngày trả tiền là mục cần thiết',
      'DELIVERY_DATE': 'Ngày giao hàng',
      'DELIVERY_DATE_REQUIRED': 'Ngày giao hàng là mục cần thiết',
      'VIEW': 'Xem sét',
      'NO_PRINTER': 'Không tìm thấy máy in cần thiết'            
    });
  }

})();