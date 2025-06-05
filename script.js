 // biến toàn cục
        let currentUser = null;
        let pins = [];
        let currentPage = 0;
        let isLoading = false;
        let searchTerm = '';

        // các ảnh mẫu và tiêu đề mô tả
        const sampleImageUrls = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
            'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400',
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
            'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400',
            'https://images.unsplash.com/photo-1506102383123-c8ef1e872756?w=400',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
            'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400',
            'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400',
            'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400',
            'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400',
            'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=400'
        ];

        const sampleTitles = [
            'Cảnh đẹp thiên nhiên',
            'Kiến trúc hiện đại',
            'Nghệ thuật đường phố',
            'Ẩm thực ngon',
            'Du lịch khám phá',
            'Thiết kế sáng tạo',
            'Phong cảnh núi rừng',
            'Bình minh tuyệt đẹp',
            'Đại dương xanh',
            'Thành phố về đêm',
            'Hoa lá mùa xuân',
            'Kiến trúc cổ điển',
            'Cuộc sống đô thị',
            'Thiên nhiên hoang dã',
            'Phong cảnh mùa đông'
        ];

        const sampleDescriptions = [
            'Một khung cảnh tuyệt đẹp từ thiên nhiên',
            'Kiệt tác kiến trúc đầy ấn tượng',
            'Nghệ thuật sống động trên phố',
            'Hương vị độc đáo và hấp dẫn',
            'Trải nghiệm du lịch thú vị',
            'Ý tưởng thiết kế độc đáo',
            'Phong cảnh núi non hùng vĩ',
            'Khoảnh khắc bình minh đẹp như tranh',
            'Vẻ đẹp bao la của đại dương',
            'Ánh đèn thành phố lung linh',
            'Sắc màu rực rỡ của mùa xuân',
            'Nét đẹp cổ kính và trang trọng',
            'Nhịp sống sôi động của đô thị',
            'Vẻ đẹp nguyên sơ của tự nhiên',
            'Không gian yên bình mùa đông'
        ];

        const authors = ['Minh Anh', 'Thu Hà', 'Đức Nam', 'Linh Chi', 'Hoàng Long', 'Mai Ly', 'Tuấn Kiệt', 'Phương Thảo'];

        // Thêm mảng avatar mẫu cho author
const authorAvatars = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/65.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/men/12.jpg',
    'https://randomuser.me/api/portraits/women/21.jpg',
    'https://randomuser.me/api/portraits/men/77.jpg',
    'https://randomuser.me/api/portraits/women/85.jpg',
    'https://randomuser.me/api/portraits/men/90.jpg',
    'https://randomuser.me/api/portraits/women/95.jpg'
];

        // xác minh trong các hộp thoại
        function openLoginModal() {
            document.getElementById('loginModal').style.display = 'block';
        }

        function openRegisterModal() {
            document.getElementById('registerModal').style.display = 'block';
        }

        function openUploadModal() {
            if (!currentUser) {
                showNotification('Vui lòng đăng nhập để tải lên hình ảnh!', 'error');
                return;
            }
            document.getElementById('uploadModal').style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // đóng các sự kiện để đóng hộp thoại khi nhấp vào dấu "x" hoặc bên ngoài hộp thoại
        window.onclick = function(event) {
            const modals = ['loginModal', 'registerModal', 'uploadModal'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }

        // form đăng nhập
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                currentUser = {
                    name: email.split('@')[0],
                    email: email
                };
                
                showNotification('Đăng nhập thành công!', 'success');
                updateAuthUI();
                closeModal('loginModal');
                document.getElementById('loginForm').reset();
            } else {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
            }
        });

        // form đăng ký
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            if (name && email && password) {
                currentUser = {
                    name: name,
                    email: email
                };
                
                showNotification('Đăng ký thành công!', 'success');
                updateAuthUI();
                closeModal('registerModal');
                document.getElementById('registerForm').reset();
            } else {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
            }
        });

        // Xử lý upload hình ảnh
        const fileUpload = document.getElementById('fileUpload');
        const imageFile = document.getElementById('imageFile');
        const imagePreview = document.getElementById('imagePreview');

        fileUpload.addEventListener('click', () => imageFile.click());
        
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUpload.classList.add('dragover');
        });

        fileUpload.addEventListener('dragleave', () => {
            fileUpload.classList.remove('dragover');
        });

        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUpload.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        });

        imageFile.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });

        function handleFileSelect(file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                showNotification('Vui lòng chọn file hình ảnh!', 'error');
            }
        }

        // form upload hình ảnh
        document.getElementById('uploadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('pinTitle').value;
            const description = document.getElementById('pinDescription').value;
            const file = document.getElementById('imageFile').files[0];
            
            if (title && file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newPin = {
                        id: Date.now(),
                        title: title,
                        description: description || 'Không có mô tả',
                        image: e.target.result,
                        author: currentUser.name,
                        date: new Date().toLocaleDateString('vi-VN'),
                        height: Math.floor(Math.random() * 200) + 200
                    };
                    
                    // thêm pin mới vào mảng pins
                    pins.unshift(newPin);
                    
                    // render pin mới lên đầu trang
                    renderPins([newPin], true);
                    
                    showNotification('Đã tải lên thành công!', 'success');
                    closeModal('uploadModal');
                    
                    // reset form và ẩn preview
                    document.getElementById('uploadForm').reset();
                    imagePreview.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else {
                showNotification('Vui lòng điền tiêu đề và chọn hình ảnh!', 'error');
            }
        });

        // Cập nhật giao diện người dùng xác thực
        function updateAuthUI() {
            const authSection = document.getElementById('authSection');
            
            if (currentUser) {
                authSection.innerHTML = `
                    <button class="btn btn-upload" onclick="openUploadModal()" title="Tải lên ảnh">+</button>
                    <div class="user-info">
                        <div class="user-avatar">${currentUser.name.charAt(0).toUpperCase()}</div>
                        <span>${currentUser.name}</span>
                        <button class="btn btn-logout" onclick="logout()">Đăng Xuất</button>
                    </div>
                `;
            } else {
                authSection.innerHTML = `
                    <div class="auth-buttons">
                        <button class="btn btn-login" onclick="openLoginModal()">Đăng Nhập</button>
                        <button class="btn btn-register" onclick="openRegisterModal()">Đăng Ký</button>
                    </div>
                `;
            }
        }

        // Xử lý đăng xuất
        function logout() {
            currentUser = null;
            showNotification('Đã đăng xuất thành công!', 'info');
            updateAuthUI();
        }

        // Hiển thị thông báo
        function showNotification(message, type) {
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }

        // Tạo các pin mẫu
        function generatePins(count) {
            const newPins = [];
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * sampleImageUrls.length);
                const randomAvatar = authorAvatars[Math.floor(Math.random() * authorAvatars.length)];
                newPins.push({
                    id: Date.now() + i,
                    title: sampleTitles[randomIndex] || `Hình ảnh ${pins.length + i + 1}`,
                    description: sampleDescriptions[randomIndex] || 'Một hình ảnh đẹp',
                    image: sampleImageUrls[randomIndex],
                    author: authors[Math.floor(Math.random() * authors.length)],
                    authorAvatar: randomAvatar,
                    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('vi-VN'),
                    height: Math.floor(Math.random() * 200) + 200
                });
            }
            return newPins;
        }

        // Tải các pin ban đầu
        function loadPins() {
            if (isLoading) return;
            
            isLoading = true;
            const loading = document.getElementById('loading');
            loading.classList.remove('hidden');
            
            setTimeout(() => {
                const newPins = generatePins(10);
                pins = pins.concat(newPins);
                renderPins(newPins);
                currentPage++;
                isLoading = false;
                loading.classList.add('hidden');
            }, 1000);
        }

        // Render các pin lên giao diện
       function renderPins(pinsToRender, prepend = false) {
    const container = document.getElementById('masonryGrid');

    pinsToRender.forEach((pin, index) => {
        const pinElement = document.createElement('div');
        pinElement.className = 'pin-card';
        pinElement.style.animationDelay = `${index * 0.1}s`;

        pinElement.innerHTML = `
    <img src="${pin.image}" alt="${pin.title}" class="pin-image" 
         style="height: ${pin.height}px;" loading="lazy">
    <div class="pin-content">
        <div class="pin-title">${pin.title}</div>
        <div class="pin-description">${pin.description}</div>
        <div class="pin-meta">
            <div class="pin-author">
                <img src="${pin.authorAvatar || 'https://randomuser.me/api/portraits/lego/1.jpg'}" class="author-avatar" alt="avatar" style="object-fit:cover;" onerror="this.onerror=null;this.src='https://randomuser.me/api/portraits/lego/1.jpg'">
                <span>${pin.author}</span>
            </div>
            <span>${pin.date}</span>
        </div>
        <div class="pin-actions"></div>
    </div>
`;


        // Tạo nút Save
        const saveBtn = document.createElement("button");
        saveBtn.className = "save-btn";
        saveBtn.innerText = pin.saved ? "Đã lưu" : "Lưu";
        saveBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            pin.saved = !pin.saved;
            saveBtn.innerText = pin.saved ? "Đã lưu" : "Lưu";
        });

        // Tạo nút Share
        const shareBtn = document.createElement("button");
        shareBtn.className = "share-btn";
        shareBtn.innerText = "Chia sẻ";
        shareBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (navigator.share) {
                navigator.share({
                    title: 'E&S',
                    text: pin.description,
                    url: window.location.href
                }).catch(error => console.log("Lỗi chia sẻ: ", error));
            } else {
                alert("Trình duyệt không hỗ trợ chia sẻ!");
            }
        });

        // Thêm nút vào `.pin-actions`
        const actionsContainer = pinElement.querySelector(".pin-actions");
        actionsContainer.appendChild(saveBtn);
        actionsContainer.appendChild(shareBtn);

        // Sự kiện click vào pin để xem chi tiết
        pinElement.addEventListener('click', function(e) {
            showPinDetails(pin);
        });

        if (prepend) {
            container.insertBefore(pinElement, container.firstChild);
        } else {
            container.appendChild(pinElement);
        }
    });
}

// Hiển thị chi tiết pin trong modal
function showPinDetails(pin) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <span class="close" style="cursor:pointer;font-size:28px;float:right;" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <img src="${pin.image}" alt="${pin.title}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem; object-fit:cover; max-height:350px;">
            <h2>${pin.title}</h2>
            <p style="color: #666; margin: 1rem 0;">${pin.description}</p>
            <div class="pin-meta" style="margin-top: 1rem;">
                <div class="pin-author">
                    <img src="${pin.authorAvatar || 'https://randomuser.me/api/portraits/lego/1.jpg'}" class="author-avatar" alt="avatar" style="object-fit:cover;">
                    <span><strong>${pin.author}</strong></span>
                </div>
                <span>${pin.date}</span>
            </div>
            <div class="pin-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end;"></div>
        </div>
    `;
    document.body.appendChild(modal);
    // Thêm nút Save và Share vào modal
    const actionsContainer = modal.querySelector('.pin-actions');
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.innerText = pin.saved ? 'Đã lưu' : 'Lưu';
    saveBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        pin.saved = !pin.saved;
        saveBtn.innerText = pin.saved ? 'Đã lưu' : 'Lưu';
    });
    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn';
    shareBtn.innerText = 'Chia sẻ';
    shareBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: 'E&S',
                text: pin.description,
                url: window.location.href
            }).catch(error => console.log('Lỗi chia sẻ: ', error));
        } else {
            alert('Trình duyệt không hỗ trợ chia sẻ!');
        }
    });
    actionsContainer.appendChild(saveBtn);
    actionsContainer.appendChild(shareBtn);
    // Đóng modal khi click ra ngoài
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
// ...existing code...
        // Xử lý tìm kiếm
        document.getElementById('searchInput').addEventListener('input', function(e) {
            searchTerm = e.target.value.toLowerCase();
            filterPins();
        });

        function filterPins() {
            const container = document.getElementById('masonryGrid');
            const pinCards = container.querySelectorAll('.pin-card');
            
            pinCards.forEach(card => {
                const title = card.querySelector('.pin-title').textContent.toLowerCase();
                const description = card.querySelector('.pin-description').textContent.toLowerCase();
                const author = card.querySelector('.pin-author span').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || author.includes(searchTerm)) {
                    card.style.display = 'inline-block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Xử lý cuộn vô hạn
        function handleInfiniteScroll() {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 1000;
            
            if (scrollPosition >= threshold && !isLoading && !searchTerm) {
                loadPins();
            }
        }

        // Thêm sự kiện cuộn và tải trang
        window.addEventListener('scroll', handleInfiniteScroll);
        window.addEventListener('load', () => {
            loadPins();
            showNotification('Chào mừng bạn đến với E&S! 📌', 'info');
        });

        // Xử lý lỗi hình ảnh
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkjDrG5oIMOhbmggdGnDnm0gxJHGsOG7o2MgdOG6o2k8L3RleHQ+PC9zdmc+';
                e.target.style.height = '200px';
            }
        }, true);

        // Tối ưu hóa bố cục Masonry
        function optimizeMasonryLayout() {
            const grid = document.getElementById('masonryGrid');
            const cards = grid.querySelectorAll('.pin-card');
            
            // Xóa tất cả các thẻ pin hiện tại
            const screenWidth = window.innerWidth;
            let columnCount;
            
            if (screenWidth > 1200) columnCount = 5;
            else if (screenWidth > 900) columnCount = 4;
            else if (screenWidth > 600) columnCount = 3;
            else if (screenWidth > 400) columnCount = 2;
            else columnCount = 1;
            
            grid.style.columnCount = columnCount;
        }

        // Tối ưu hóa bố cục Masonry khi tải trang và thay đổi kích thước
        window.addEventListener('resize', optimizeMasonryLayout);
        
        // Tối ưu hóa bố cục Masonry khi tải trang
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Tạo nút cuộn lên đầu trang
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #e60023;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        scrollButton.onclick = scrollToTop;
        document.body.appendChild(scrollButton);

        // Hiển thị nút cuộn lên đầu trang khi cuộn xuống
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });
