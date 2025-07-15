// header.js
document.addEventListener('DOMContentLoaded', function() {
    loadDataCart();

    document.querySelectorAll('form[action^="/add-to-cart"], form[action^="/cart/remove"]').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            fetch(this.action, {
                method: this.method,
                body: new FormData(this)
            })
            .then(response => response.text())
            .then(() => loadDataCart())
            .catch(error => console.error('Error:', error));
        });
    });
});

function loadTotalPrice() {
	
}

function loadDataCart() {
    fetch('/cart/items')
        .then(response => response.json())
        .then(datas => {
            const totalQuantity = datas.cartItems.reduce((total, item) => total + item.quantity, 0);

            if (document.getElementById('num_cart')) {
                document.getElementById('num_cart').innerHTML = `${totalQuantity}`;
            }
            if (document.getElementById('num_cart_mob')) {
                document.getElementById('num_cart_mob').innerHTML = `${totalQuantity}`;
            }

            if (totalQuantity === 0) {
                $('.cart-pay').html(`<a href="/" class="btn primary w-100">Về trang chủ</a>`);
            }

            const cart_header_nick = document.getElementById('cart-header-nick');
            const cart_header_service = document.getElementById('cart-header-service');
            const title_nick = document.getElementById('title-nick');
            const title_service = document.getElementById('title-service');

            function createHtmlCart(data) {
                let detailUrl = '';
                switch (data.gameId) {
                    case 1:
                        detailUrl = `/lienquanDetail-${data.accountId}`;
                        break;
                    case 2:
                        detailUrl = `/valorantDetail-${data.accountId}`;
                        break;
                    case 3:
                        detailUrl = `/pubgDetail-${data.accountId}`;
                        break;
                    default:
                        detailUrl = `/detail-${data.accountId}`;
                }

                title_nick.innerHTML = 'Nick';
                return `
                    <li class="list-group-item">
                        <div class="row">
                            <nav aria-label="img" class="navbar">
                                <a href="${detailUrl}"> 
                                    <img src="/test/images/${data.gameName.toLowerCase()}-icon.png" width="60" height="35" alt="${data.gameName}">
                                </a>
                            </nav>
                            <div class="col pr-0">
                                <a href="${detailUrl}" class="text-limit limit-1 fw-700 pl-2">
                                    <span class="text-danger">#${data.accountId}</span> ${data.gameName}
                                </a>
                            </div>
                            <div class="col-lg-4 col-4 text-end">
                                <p class="price-cart">${formatNumber(data.price)}đ</p>
                            </div>
                        </div>
                    </li>`;
            }

            function createHtmlCartService(data) {
                return '';
            }

            if (datas.cartItems && datas.cartItems.length > 0) {
                const html = datas.cartItems.map(createHtmlCart).filter(Boolean).join('');
                const html_service = datas.cartItems.map(createHtmlCartService).filter(Boolean).join('');

                cart_header_nick.innerHTML = html || `
                    <li>
                        <p class="text-center fz-20">Giỏ hàng trống !!!</p>
                    </li>
                    <li>
                        <div class="d-flex justify-content-center">
                            <img class="w-75 img-null-cart" src="test/images/empty-cart.png" alt="Giỏ hàng trống">
                        </div>
                    </li>`;
                cart_header_service.innerHTML = html_service || '';
                if (!html_service) {
                    document.getElementById('title-service').innerHTML = '';
                }
            } else {
                cart_header_nick.innerHTML = `
                    <li>
                        <p class="text-center fz-20">Giỏ hàng trống !!!</p>
                    </li>
                    <li>
                        <div class="d-flex justify-content-center">
                            <img class="w-75 img-null-cart" src="test/images/empty-cart.png" alt="Giỏ hàng trống">
                        </div>
                    </li>`;
                cart_header_service.innerHTML = '';
                document.getElementById('title-service').innerHTML = '';
            }
        })
        .catch(error => {
            console.error('Error loading cart data:', error);
            document.getElementById('num_cart').innerHTML = '0';
            if (document.getElementById('num_cart_mob')) {
                document.getElementById('num_cart_mob').innerHTML = '0';
            }
            document.getElementById('cart-header-nick').innerHTML = `
                <li>
                    <p class="text-center fz-20">Giỏ hàng trống !!!</p>
                </li>
                <li>
                    <div class="d-flex justify-content-center">
                        <img class="w-75 img-null-cart" src="test/images/empty-cart.png" alt="Giỏ hàng trống">
                    </div>
                </li>`;
            document.getElementById('cart-header-service').innerHTML = '';
            document.getElementById('title-service').innerHTML = '';
        });
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function checkTotalQuantityCart() {
    return fetch('/cart/count')
        .then(response => response.json())
        .then(totalQuantity => totalQuantity)
        .catch(error => {
            console.error('Error checking cart quantity:', error);
            return 0;
        });
}