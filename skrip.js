        // Sample product data dengan kategori baru dan produk diskon (dikurangi menjadi 15 produk)
        const products = [
            { id: 1, name: 'Pizza Margherita', price: 35000, category: 'makanan', barcode: '1234567890123', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop&crop=center', stock: 15 },
            { id: 2, name: 'Ayam Bakar', price: 25000, category: 'makanan', barcode: '1234567890124', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h-400&fit=crop&crop=center', stock: 12 },
            { id: 3, name: 'Es Teh Manis', price: 5000, category: 'minuman', barcode: '1234567890125', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h-400&fit=crop&crop=center', stock: 25 },
            { id: 4, name: 'Kopi Hitam', price: 8000, category: 'minuman', barcode: '1234567890126', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h-400&fit=crop&crop=center', stock: 20 },
            { id: 5, name: 'Cetak Kartu', price: 15000, category: 'printing', barcode: '1234567890127', image: 'https://plus.unsplash.com/premium_photo-1755994149244-d7887690b774?w=400&h-400&fit=crop&crop=center', stock: 100 },
            { id: 6, name: 'Roti Bakar', price: 12000, category: 'makanan', barcode: '1234567890128', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h-400&fit=crop&crop=center', stock: 10 },
            { id: 7, name: 'Jus Jeruk', price: 12000, category: 'minuman', barcode: '1234567890129', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h-400&fit=crop&crop=center', stock: 15 },
            { id: 8, name: 'Print Hitam Putih', price: 500, category: 'printing', barcode: '1234567890130', image: 'https://images.unsplash.com/photo-1620302044818-4209fdb10e62?w=400&h-400&fit=crop&crop=center', stock: 200 },
            { id: 9, name: 'Mie Goreng Spesial', price: 18000, category: 'makanan', barcode: '1234567890131', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h-400&fit=crop&crop=center', stock: 14 },
            { id: 10, name: 'Sate Ayam', price: 22000, category: 'makanan', barcode: '1234567890132', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h-400&fit=crop&crop=center', stock: 8 },
            { id: 11, name: 'Es Jeruk', price: 7000, category: 'minuman', barcode: '1234567890133', image: 'https://images.unsplash.com/photo-1594975631657-904804a44e4d?w=400&h-400&fit=crop&crop=center', stock: 16 },
            { id: 12, name: 'Jus Alpukat', price: 15000, category: 'minuman', barcode: '1234567890134', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h-400&fit=crop&crop=center', stock: 12 },
            { id: 13, name: 'Buku Tulis', price: 5000, category: 'atk', barcode: '1234567890135', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h-400&fit=crop&crop=center', stock: 50 },
            { id: 14, name: 'Pulpen Standard', price: 3000, category: 'atk', barcode: '1234567890136', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h-400&fit=crop&crop=center', stock: 100 },
            { id: 15, name: 'Pensil 2B', price: 2000, category: 'atk', barcode: '1234567890137', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h-400&fit=crop&crop=center', stock: 80 }
        ];
        
        let cart = [];
        let currentCategory = 'all';
        let deliveryOption = 'pickup';
        let deliveryFee = 0;
        let paymentMethod = 'tunai';
        
        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            try {
                updateTime();
                setInterval(updateTime, 1000);
                
                renderProducts();
                setupEventListeners();
                setupScrollButton();
                
                // PERBAIKAN: Event delegation untuk produk yang di-render secara dinamis
                document.getElementById('productsGrid').addEventListener('click', function(e) {
                    const productCard = e.target.closest('.product-card');
                    if (productCard) {
                        // Dapatkan ID produk dari data attribute
                        const productId = parseInt(productCard.dataset.productId);
                        if (productId) {
                            addToCartWithAnimation(productId, productCard);
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing app:', error);
            }
        });
        
        function updateTime() {
            try {
                const now = new Date();
                const timeElement = document.getElementById('currentTime');
                if (timeElement) {
                    timeElement.textContent = now.toLocaleString('id-ID');
                }
            } catch (error) {
                console.error('Error updating time:', error);
            }
        }
        
        function renderProducts() {
            try {
                const filteredProducts = currentCategory === 'all' 
                    ? products 
                    : products.filter(function(p) { return p.category === currentCategory; });
                
                renderFilteredProducts(filteredProducts);
            } catch (error) {
                console.error('Error rendering products:', error);
            }
        }
        
        function renderFilteredProducts(filteredProducts) {
            const grid = document.getElementById('productsGrid');
            
            if (filteredProducts.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <i class="fas fa-search text-3xl text-gray-400 mb-3"></i>
                        <p class="text-gray-600 text-sm">Tidak ada produk ditemukan</p>
                        <p class="text-gray-500 text-xs">Coba kata kunci lain atau pilih kategori berbeda</p>
                    </div>
                `;
                return;
            }
            
            grid.innerHTML = filteredProducts.map(product => {
                let discountBadge = '';
                let priceHTML = '';
                let preOrderLabel = '';
                
                if (product.discount) {
                    discountBadge = `<div class="discount-badge">-${product.discount}%</div>`;
                    priceHTML = `
                        <p class="product-price">
                            <span class="original-price">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>
                            Rp ${product.price.toLocaleString('id-ID')}
                        </p>
                    `;
                } else {
                    priceHTML = `<p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>`;
                }
                
                if (product.preOrder) {
                    preOrderLabel = `<div class="pre-order-label">Pre Order</div>`;
                }
                
                return `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-image-wrapper">
                        ${discountBadge}
                        <img src="${product.image}" alt="${product.name}" class="product-image-fixed">
                    </div>
                    <div class="product-content">
                        <h3 class="product-name">${product.name}</h3>
                        ${preOrderLabel}
                        ${priceHTML}
                        <p class="product-stock">Stok: ${product.stock}</p>
                    </div>
                </div>
                `;
            }).join('');
        }
        
        function showNotification(message, type = 'info') {
            const notification = document.getElementById('notification');
            const icon = document.getElementById('notificationIcon');
            const messageEl = document.getElementById('notificationMessage');
            
            // Show notification first
            notification.classList.remove('hidden');
            
            // Set icon and color based on type
            if (type === 'success') {
                icon.innerHTML = '<i class="fas fa-check-circle text-green-500 text-sm"></i>';
                notification.querySelector('div').classList.add('border-green-500');
                notification.querySelector('div').classList.remove('border-red-500', 'border-blue-500');
            } else if (type === 'error') {
                icon.innerHTML = '<i class="fas fa-exclamation-circle text-red-500 text-sm"></i>';
                notification.querySelector('div').classList.add('border-red-500');
                notification.querySelector('div').classList.remove('border-green-500', 'border-blue-500');
            } else {
                icon.innerHTML = '<i class="fas fa-info-circle text-blue-500 text-sm"></i>';
                notification.querySelector('div').classList.add('border-blue-500');
                notification.querySelector('div').classList.remove('border-green-500', 'border-red-500');
            }
            messageEl.textContent = message;
            // Show notification with animation
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
            // Hide after 3 seconds
            setTimeout(() => {
                notification.classList.remove('translate-x-0');
                notification.classList.add('translate-x-full');
                // Hide completely after animation
                setTimeout(() => {
                    notification.classList.add('hidden');
                }, 300);
            }, 3000);
        }
        
        // ANIMASI BARU: Tampilkan modal sukses
        function showSuccessModal(message) {
            document.getElementById('successMessage').textContent = message;
            document.getElementById('successModal').classList.add('open');
            document.getElementById('successOverlay').classList.add('open');
            // Efek konfeti dihapus sesuai permintaan
        }
        
        // ANIMASI BARU: Tutup modal sukses
        function closeSuccessModal() {
            document.getElementById('successModal').classList.remove('open');
            document.getElementById('successOverlay').classList.remove('open');
        }
        
        // ANIMASI BARU: Animasi item mengambang ke keranjang
        function createFloatingItem(startX, startY, productId) {
            const cartBtn = document.getElementById('cartBtn');
            const cartBtnRect = cartBtn.getBoundingClientRect();
            const endX = cartBtnRect.left + cartBtnRect.width / 2;
            const endY = cartBtnRect.top + cartBtnRect.height / 2;
            
            const floatingItem = document.createElement('div');
            floatingItem.className = 'floating-item';
            floatingItem.innerHTML = '<i class="fas fa-plus"></i>';
            floatingItem.style.setProperty('--tx', `${endX - startX}px`);
            floatingItem.style.setProperty('--ty', `${endY - startY}px`);
            floatingItem.style.left = `${startX}px`;
            floatingItem.style.top = `${startY}px`;
            
            document.body.appendChild(floatingItem);
            
            setTimeout(() => {
                document.body.removeChild(floatingItem);
            }, 1000);
        }
        
        function setupEventListeners() {
            // Profile menu toggle
            document.getElementById('profileBtn').addEventListener('click', function(e) {
                e.stopPropagation();
                const menu = document.getElementById('profileMenu');
                menu.classList.toggle('hidden');
            });
            
            // Close profile menu when clicking outside
            document.addEventListener('click', function(e) {
                const profileMenu = document.getElementById('profileMenu');
                const profileBtn = document.getElementById('profileBtn');
                if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
                    profileMenu.classList.add('hidden');
                    document.getElementById('searchInfo').classList.add('hidden');
                }
            });
            
            // Cart modal toggle
            document.getElementById('cartBtn').addEventListener('click', function() {
                document.getElementById('cartModal').classList.add('open');
                document.getElementById('cartOverlay').classList.add('open');
            });
            
            document.getElementById('closeCart').addEventListener('click', closeCartModal);
            document.getElementById('cartOverlay').addEventListener('click', closeCartModal);
            
            // Profile modal
            document.getElementById('editProfileBtn').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('profileMenu').classList.add('hidden');
                document.getElementById('profileModal').classList.add('open');
                document.getElementById('profileOverlay').classList.add('open');
            });
            
            document.getElementById('cancelEditProfile').addEventListener('click', closeProfileModal);
            document.getElementById('profileOverlay').addEventListener('click', closeProfileModal);
            
            document.getElementById('profileForm').addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Profil berhasil diperbarui', 'success');
                closeProfileModal();
            });
            
            // Role selection change
            document.getElementById('roleSelect').addEventListener('change', function() {
                const role = this.value;
                if (role === 'guru') {
                    document.getElementById('officeField').classList.remove('hidden');
                    document.getElementById('classField').classList.add('hidden');
                } else {
                    document.getElementById('officeField').classList.add('hidden');
                    document.getElementById('classField').classList.remove('hidden');
                }
            });
            
            // Payment method selection
            document.getElementById('paymentSelect').addEventListener('change', function() {
                paymentMethod = this.value;
            });
            
            // Checkout button
            document.getElementById('checkoutBtn').addEventListener('click', function() {
                closeCartModal();
                // Show delivery options
                document.getElementById('deliveryModal').classList.add('open');
                document.getElementById('deliveryOverlay').classList.add('open');
            });
            
            // Delivery options
            document.querySelectorAll('.delivery-option').forEach(option => {
                option.addEventListener('click', function() {
                    document.querySelectorAll('.delivery-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    const radio = this.querySelector('input[type="radio"]');
                    radio.checked = true;
                    deliveryOption = radio.value;
                });
            });
            
            // Confirm delivery
            document.getElementById('confirmDelivery').addEventListener('click', function() {
                const deliveryNote = document.getElementById('deliveryNote').value;
                deliveryFee = deliveryOption === 'delivery' ? 1000 : 0;
                
                // Calculate total
                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const total = subtotal + deliveryFee;
                
                if (paymentMethod === 'tunai') {
                    // For cash payment, show success notification
                    let message = 'Pesanan berhasil diproses!';
                    if (deliveryOption === 'delivery') {
                        message += ' (Diantar - Biaya Rp 1.000)';
                    } else {
                        message += ' (Ambil Sendiri)';
                    }
                    
                    if (deliveryNote) {
                        message += ' Catatan: ' + deliveryNote;
                    }
                    
                    message += ` Metode pembayaran: Tunai`;
                    
                    // ANIMASI BARU: Tampilkan modal sukses dengan animasi
                    showSuccessModal(message);
                    
                    // Reset cart and close modals
                    cart = [];
                    renderCart();
                    closeDeliveryModal();
                } else if (paymentMethod === 'qris') {
                    // For QRIS payment, show QRIS modal
                    document.getElementById('qrisTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
                    document.getElementById('qrisModal').classList.add('open');
                    document.getElementById('qrisOverlay').classList.add('open');
                    closeDeliveryModal();
                }
            });
            
            // Cancel delivery
            document.getElementById('cancelDelivery').addEventListener('click', closeDeliveryModal);
            document.getElementById('deliveryOverlay').addEventListener('click', closeDeliveryModal);
            
            // QRIS modal events
            document.getElementById('cancelQris').addEventListener('click', closeQrisModal);
            document.getElementById('qrisOverlay').addEventListener('click', closeQrisModal);
            
            // Proof upload functionality
            document.getElementById('proofUpload').addEventListener('change', function(e) {
                const file = e.target.files[0];
                const preview = document.getElementById('proofPreview');
                const previewImage = document.getElementById('previewImage');
                const confirmBtn = document.getElementById('confirmQris');
                
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImage.src = e.target.result;
                        preview.style.display = 'block';
                        confirmBtn.disabled = false;
                    }
                    reader.readAsDataURL(file);
                } else {
                    preview.style.display = 'none';
                    confirmBtn.disabled = true;
                }
            });
            
            // Remove proof button
            document.getElementById('removeProof').addEventListener('click', function() {
                document.getElementById('proofUpload').value = '';
                document.getElementById('proofPreview').style.display = 'none';
                document.getElementById('confirmQris').disabled = true;
            });
            
            // Confirm QRIS payment
            document.getElementById('confirmQris').addEventListener('click', function() {
                const deliveryNote = document.getElementById('deliveryNote').value;
                
                let message = 'Pembayaran QRIS berhasil! Pesanan sedang diproses.';
                if (deliveryOption === 'delivery') {
                    message += ' (Diantar - Biaya Rp 1.000)';
                } else {
                    message += ' (Ambil Sendiri)';
                }
                
                if (deliveryNote) {
                    message += ' Catatan: ' + deliveryNote;
                }
                
                // ANIMASI BARU: Tampilkan modal sukses dengan animasi
                showSuccessModal(message);
                
                // Reset cart and close modals
                cart = [];
                renderCart();
                closeQrisModal();
            });
            
            // Success modal close button
            document.getElementById('closeSuccess').addEventListener('click', closeSuccessModal);
            document.getElementById('successOverlay').addEventListener('click', closeSuccessModal);
            
            // History modal (menggantikan notifications modal)
            document.getElementById('historyBtn').addEventListener('click', function() {
                document.getElementById('historyModal').classList.add('open');
                document.getElementById('historyOverlay').classList.add('open');
            });
            
            document.getElementById('closeHistory').addEventListener('click', closeHistoryModal);
            document.getElementById('historyOverlay').addEventListener('click', closeHistoryModal);
            
            // Category buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    // Reset active states
                    document.querySelectorAll('.category-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    // Set active state
                    this.classList.add('active');
                    currentCategory = this.dataset.category;
                    document.getElementById('searchProduct').value = ''; // Clear search
                    document.getElementById('clearSearch').classList.add('hidden');
                    renderProducts();
                    
                    // Show category name tooltip on mobile
                    if (window.innerWidth <= 768) {
                        const tooltip = document.getElementById('categoryTooltipMobile');
                        tooltip.textContent = this.dataset.tooltip;
                        tooltip.classList.add('show');
                        
                        setTimeout(() => {
                            tooltip.classList.remove('show');
                        }, 2000);
                    }
                });
            });
            
            // Filter toggle buttons (desktop and mobile)
            document.getElementById('filterToggle').addEventListener('click', function() {
                const categoryFilter = document.getElementById('categoryFilter');
                categoryFilter.classList.toggle('hidden');
                this.classList.toggle('active');
            });
            
            document.getElementById('filterToggleMobile').addEventListener('click', function() {
                const categoryFilter = document.getElementById('categoryFilter');
                categoryFilter.classList.toggle('hidden');
                this.classList.toggle('active');
            });
            
            // Search functionality
            document.getElementById('searchProduct').addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                const clearBtn = document.getElementById('clearSearch');
                const searchInfo = document.getElementById('searchInfo');
                const searchResultText = document.getElementById('searchResultText');
                
                // Show/hide clear button
                if (searchTerm) {
                    clearBtn.classList.remove('hidden');
                } else {
                    clearBtn.classList.add('hidden');
                    searchInfo.classList.add('hidden');
                    renderProducts();
                    return;
                }
                
                // Filter products
                let filteredProducts = products.filter(p => 
                    p.name.toLowerCase().includes(searchTerm)
                );
                
                // Apply category filter if not "all"
                if (currentCategory !== 'all') {
                    filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
                }
                
                // Show search results info
                searchInfo.classList.remove('hidden');
                searchResultText.textContent = `Ditemukan ${filteredProducts.length} produk untuk "${this.value}"`;
                
                // Render filtered products
                renderFilteredProducts(filteredProducts);
            });
            
            // Clear search button
            document.getElementById('clearSearch').addEventListener('click', function() {
                document.getElementById('searchProduct').value = '';
                this.classList.add('hidden');
                document.getElementById('searchInfo').classList.add('hidden');
                renderProducts();
            });
            
            // Clear search results
            document.getElementById('clearSearchResults').addEventListener('click', function() {
                document.getElementById('searchProduct').value = '';
                document.getElementById('clearSearch').classList.add('hidden');
                document.getElementById('searchInfo').classList.add('hidden');
                renderProducts();
            });
            
            // PERBAIKAN: Download QRIS button functionality
            document.getElementById('downloadQrisBtn').addEventListener('click', function() {
                // Create a temporary anchor element to trigger download
                const link = document.createElement('a');
                link.href = 'https://vhurelhciwirynuqpnjt.supabase.co/storage/v1/object/public/aksara/image/QRIS.webp';
                link.download = 'QRIS_AksaraMart.png';
                
                // Append to body, click and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                showNotification('QR Code berhasil didownload', 'success');
            });
        }
        
        // PERBAIKAN: Setup scroll button functionality
        function setupScrollButton() {
            const scrollButton = document.getElementById('scrollToTop');
            
            // Show/hide scroll button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollButton.classList.add('show');
                } else {
                    scrollButton.classList.remove('show');
                }
            });
            
            // Scroll to top when button is clicked
            scrollButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        function closeCartModal() {
            document.getElementById('cartModal').classList.remove('open');
            document.getElementById('cartOverlay').classList.remove('open');
        }
        
        function closeProfileModal() {
            document.getElementById('profileModal').classList.remove('open');
            document.getElementById('profileOverlay').classList.remove('open');
        }
        
        function closeDeliveryModal() {
            document.getElementById('deliveryModal').classList.remove('open');
            document.getElementById('deliveryOverlay').classList.remove('open');
        }
        
        function closeQrisModal() {
            document.getElementById('qrisModal').classList.remove('open');
            document.getElementById('qrisOverlay').classList.remove('open');
            
            // Reset proof upload
            document.getElementById('proofUpload').value = '';
            document.getElementById('proofPreview').style.display = 'none';
            document.getElementById('confirmQris').disabled = true;
        }
        
        function closeHistoryModal() {
            document.getElementById('historyModal').classList.remove('open');
            document.getElementById('historyOverlay').classList.remove('open');
        }
        
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            renderCart();
        }
        
        function addToCartWithAnimation(productId, element) {
            // Get position for floating animation
            const rect = element.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            // Add click animation
            element.classList.add('clicked');
            // Remove animation class after animation completes
            setTimeout(() => {
                element.classList.remove('clicked');
            }, 600);
            
            // Create floating item animation
            createFloatingItem(startX, startY, productId);
            
            // Add to cart
            addToCart(productId);
            
            // Show notification with product name
            const product = products.find(p => p.id === productId);
            showNotification(`✅ ${product.name} ditambahkan ke keranjang!`, 'success');
        }
        
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            renderCart();
        }
        
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    renderCart();
                }
            }
        }
        
        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            const cartBadge = document.getElementById('cartBadge');
            const checkoutBtn = document.getElementById('checkoutBtn');
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            
            if (totalItems > 0) {
                cartBadge.textContent = totalItems;
                cartBadge.classList.remove('hidden');
                checkoutBtn.disabled = false;
            } else {
                cartBadge.classList.add('hidden');
                checkoutBtn.disabled = true;
            }
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="text-center text-gray-500 py-6">
                        <i class="fas fa-shopping-cart text-2xl mb-2"></i>
                        <p class="text-sm">Keranjang masih kosong</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <h4 class="cart-item-name">${item.name}</h4>
                                <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                            </div>
                            <div class="flex items-center space-x-1">
                                <button onclick="updateQuantity(${item.id}, -1)" class="bg-red-500 text-white w-5 h-5 rounded text-xs hover:bg-red-600 transition-colors">-</button>
                                <span class="text-xs font-semibold w-6 text-center text-gray-800">${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)" class="bg-green-500 text-white w-5 h-5 rounded text-xs hover:bg-green-600 transition-colors">+</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            updateTotals();
        }
        
        function updateTotals() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const total = subtotal + deliveryFee;
            document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
        }