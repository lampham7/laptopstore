🤣 user
/user/login
/user/register
/user/about
/user/change-password
/user/carts
/user/purchased
🤣 home
/?page=?sort-by=?limit
🤣 product-detail
/product-detail
🤣 products
/products
================================================
😎 admin
/admin
😎 products 
/admin/manage-products->getAllProducts
/admin/manage-products/new-product->addNewProduct
/admin/manage-products/change-product/:id->changeProduct
/admin/manage-products/capacities/:id->getAllCapacities
/admin/manage-products/new-capacity/:id->addNewCapacity
/admin/manage-products/change-capacity/:id=&product_id=->changeCapacity
😎 brands
/admin/manage-bands->getAllBrands
/admin/manage-bands/new_brand->addNewBrand
😎 carts
/admin/manage-carts?status_id= ->getAllCarts
/admin/manage-carts:cart_id ->getInforCart
================================================
Large:
(   
    Sidebar
    Container(
        Main
    )
    Footer
)
Tablet:
(
    Navbar
    Container(
        Main    
    )
    Footer
)
=================================================

reload trang call checklogin->false
or {user, carts, roleId}
*khi chưa login baseon roleId=null
    -availble: register, login

    -not allow:
*khi đã login
    -availble: change-password, about, carts, purchased










