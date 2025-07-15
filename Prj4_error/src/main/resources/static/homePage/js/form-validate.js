/*
* Hướng dẫn sử dụng
*
* Có các Rules:
*   cách selector đang sử dụng là dùng document.querySelector() ( dùng giống như selector của CSS )
*
* 1. isRequired() - Được xác định để trường không được để trống , ĐỐI SỐ: 1. selector (trỏ từ ID form) 2.message (Nếu không truyền message lỗi mặc định là 'Vui lòng nhập trường này');
*
* 2. isEmail() - Được xác định để trường nhập phải là email, ĐỐI SỐ: giống với isRequired();
*
* 3. minLength() - Được xác định để giới hạn tối thiếu kí tự trường cần nhập, ĐỐI SỐ: 1.selector, 2 giới hạn kí tự tối thiếu (Int), 3. Message khi gặp lỗi;
*
* 4. maxLength() - Được xác định để giới hạn tối đa kí tự trường cần nhập, ĐỐI SỐ: giống như minLength();
*
* 5. isConfirm() - Được xác định để xác nhận giá trị giống với 1 trường khác, ĐỐI SỐ: 1 selector , 2 giá trị cần được xác nhận (viết như demo bên dưới là đc), 3 message khi lỗi;
*
* Demo như bên dưới ( Nếu không có onSubmit như bên dưới thì form sẽ submit theo cách mặc định);
*
* Xử lí call api trong onSubmit kia nếu không muốn dùng submit mặc định;
*
* Nếu muốn thêm Rule nào thì mọi người định nghĩa thêm trong file thư viện gốc là được;
*
* Outfocus hoặc Submit form thì form mới bắt đầu validate chứ không phải lỗi đâu nhớ ^^
* */
Validator({
    form:'#form-validate-demo',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('.username','Chưa nhập tên tài khoản'),
        Validator.isRequired('.confirm-rules','Bạn chưa đồng ý với điều khoản'),
        Validator.isRequired('[name=gender]'),
        Validator.isRequired('.service-select','Cần chọn ít nhất 1 dịch vụ'),
        Validator.isRequired('.password'),
        Validator.isRequired('.confirm_password'),
        Validator.isRequired('.files'),
        Validator.isEmail('.email'),
        Validator.minLength('.password',4),
        Validator.maxLength('.password',6),
        Validator.isConfirm('.confirm_password',function () {
            return document.querySelector('#form-validate-demo .password').value
        },'Mật khẩu xác nhận chưa chính xác'),
    ],
    onSubmit:function (data) {
        alert('Form đã được submit');
    }
});

Validator({
    form:'#formLoginMobile',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=username]','Bạn chưa nhập tên tài khoản'),
        Validator.isRequired('[name=password]','Bạn chưa nhập mật khẩu'),
    ],
    onSubmit:function (data) {

    }
});



Validator({
    form:'#formRegisterMobile',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=username]','Bạn chưa nhập tên tài khoản'),
        Validator.isRequired('[name=password]','Bạn chưa nhập mật khẩu'),
        Validator.isRequired('[name=password_confirmation]','Bạn chưa nhập mật khẩu xác nhận'),
        Validator.isConfirm('[name=password_confirmation]',function () {
            return document.querySelector('#formRegisterMobile [name=password]').value
        },'Mật khẩu xác nhận chưa chính xác'),
    ],
    onSubmit:function (data) {

    }
});
Validator({
    form:'#formLogin',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=username]','Bạn chưa nhập tên tài khoản'),
        Validator.isRequired('[name=password]','Bạn chưa nhập mật khẩu'),
    ],
});
Validator({
    form:'#formRegister',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=username]','Bạn chưa nhập tên tài khoản'),
        Validator.isRequired('[name=password]','Bạn chưa nhập mật khẩu'),
        Validator.isRequired('[name=password_confirmation]','Bạn chưa nhập mật khẩu xác nhận'),
    ],
    onSubmit:function (data) {
        // alert('Form đã được submit');
    }
});

Validator({
    form:'#form-changePassword',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=old_password]','Bạn chưa nhập mật khẩu'),
        Validator.isRequired('[name=password]','Bạn chưa nhập mật khẩu mới'),
        Validator.isRequired('[name=password_confirmation]','Bạn chưa nhập mật khẩu xác nhận'),
        Validator.isConfirm('[name=password_confirmation]',function () {
            return document.querySelector('#form-changePassword [name=password]').value
        },'Mật khẩu xác nhận chưa chính xác'),
    ],
    onSubmit:function (data) {
        changePassword(data)

    }
});

Validator({
    form:'#chargeCardForm',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=pin]','Bạn chưa nhập mã pin'),
        Validator.isRequired('[name=serial]','Bạn chưa nhập số sê-ri'),
        Validator.isRequired('[name=amount]','Bạn chưa chọn mệnh giá'),
        // Validator.isRequired('[name=captcha]','Bạn chưa nhập mã captcha'),
    ],
    onSubmit:function () {
        showConfirmContent();
    }
});

Validator({
    form:'#chargeCardFormMobile',
    formGroupSelector:'.input-group-mobile',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=pin]','Bạn chưa nhập mã pin'),
        Validator.isRequired('[name=serial]','Bạn chưa nhập số sê-ri'),
        Validator.isRequired('[name=amount]','Bạn chưa chọn mệnh giá'),
        // Validator.isRequired('[name=captcha]','Bạn chưa nhập mã captcha'),
    ],
    onSubmit:function () {
        showConfirmContentMobile();
    }
});

Validator({
    form:'#chargeCardHomeForm',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=pin]','Bạn chưa nhập mã pin'),
        Validator.isRequired('[name=serial]','Bạn chưa nhập số sê-ri'),
        Validator.isRequired('[name=amount]','Bạn chưa chọn mệnh giá'),
        // Validator.isRequired('[name=captcha]','Bạn chưa nhập mã captcha'),
    ],
    onSubmit:function () {
        showHomeConfirmContent();
    }
});

Validator({
    form:'#chargeCardHomeFormMobile',
    formGroupSelector:'.input-group-mobile',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=pin]','Bạn chưa nhập mã pin'),
        Validator.isRequired('[name=serial]','Bạn chưa nhập số sê-ri'),
        Validator.isRequired('[name=amount]','Bạn chưa chọn mệnh giá'),
        // Validator.isRequired('[name=captcha]','Bạn chưa nhập mã captcha'),
    ],
    onSubmit:function () {
        showHomeConfirmContent();
    }
});

Validator({
    form:'#chargeCardModalForm',
    formGroupSelector:'.input-group',
    errorSelector:'.text-error',
    rules:[
        Validator.isRequired('[name=pin]','Bạn chưa nhập mã pin'),
        Validator.isRequired('[name=serial]','Bạn chưa nhập số sê-ri'),
        Validator.isRequired('[name=amount]','Bạn chưa chọn mệnh giá'),
        // Validator.isRequired('[name=captcha]','Bạn chưa nhập mã captcha'),
    ],
    onSubmit:function () {
        showModalConfirmContent();
    }
});
