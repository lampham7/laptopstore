<!-- danh sach san pham -->
    <div class="container">
        <a href="index.php?view=new-product" class="btn">Thêm mới</a>
        <!-- <a href="index.php?view=product&id=1" class="btn">Xem</a>  -->
        <!-- <a href="index.php?view=change-product&id=1" class="btn">Sửa</a>  -->
        <table border="1">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Ảnh</th>
                    <th>Màn hình</th>
                    <th>RAM</th>
                    <th>Ổ cứng</th>
                    <th>Hệ điều hành</th>
                    <th>CPU</th>
                    <th>VGA</th>
                    <th>Bảo hành</th>
                    <th>Giảm giá</th>
                    <th>Màu sắc</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody id="product__list">
            </tbody>
            
        </table>
        <script type="module" src="js/components/products.js"></script>
    </div>