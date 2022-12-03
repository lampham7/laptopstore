<?php
    class Product{ 
        public static function readItem($id){
            $idQuery = $id;
            $queryProduct = "select products.id as 'id', brands.name as 'brand', VGA, model, screen, RAM, hardware, OS, CPU, VGA, background, warranty, discount, color, products.created_at, products.updated_at from products inner join brands on products.brand_id = brands.id where products.id = ".$idQuery." limit 1 ;";
            $queryResultProduct = executeResult($queryProduct,true);
            if(!empty($queryResultProduct)){
                $queryCapacities = "select * from product_capacities where product_id = ".$idQuery." ;";
                $queryResultCapacities = executeResult($queryCapacities);
                $dataRes = array(
                "id"=>$queryResultProduct["id"],
                "brand"=>$queryResultProduct["brand"],
                "model"=>$queryResultProduct["model"],
                "screen"=>$queryResultProduct["screen"],
                "RAM"=>$queryResultProduct["RAM"],
                "VGA"=>$queryResultProduct["VGA"],
                "hardware"=>$queryResultProduct["hardware"],
                "OS"=>$queryResultProduct["OS"],
                "CPU"=>$queryResultProduct["CPU"],
                "background"=>$queryResultProduct["background"],
                "warranty"=>$queryResultProduct["warranty"],
                "discount"=>$queryResultProduct["discount"],
                "color"=>$queryResultProduct["color"],
                "capacities"=>$queryResultCapacities,
                "created_at"=>$queryResultProduct["created_at"],
                "updated_at"=>$queryResultProduct["updated_at"]);
                echo json_encode($dataRes);
                http_response_code(200);
            }else{
                http_response_code(203);
            }
        }
        public static function readPage($page, $limit, $search, $categoryName)
        {
            $page = (int)$page;
            $limit = (int)$limit;
            $case=1;//1->3
            //get count each case
            $sql = "";
            if($search==null && $categoryName == null){
                $sql="select id from products";
            }elseif($search!=null){
                $sql="select id from products where model like '%".$search."%' ";
                $case=2;
            }elseif($categoryName!=null){
                $sql="select products.id as 'id' from brands inner join products on brands.id=products.brand_id where brands.name like '%".$categoryName."%'";
                $case=3;
            }
            $count = count(executeResult($sql)); //54 //8
            if($count>=1){
                $totalPage = ceil($count / $limit);
                if ($page > $totalPage) {
                    $page = 1;
                };
                $from = ($page - 1) * $limit;
                $sql="";
                if($case==1){
                    $sql = "select products.id, model, screen, CPU, VGA, OS, RAM, background, discount, product_capacities.price, quantity from products inner join product_capacities on products.id = product_capacities.product_id GROUP by product_capacities.product_id HAVING min(product_capacities.price) limit $from,$limit;";
                }elseif($case==2){
                    $sql = "select products.id, model, screen, CPU, VGA, OS, RAM, background, discount, product_capacities.price, quantity from products inner join product_capacities on products.id = product_capacities.product_id where model like '%".$search."%' GROUP by product_capacities.product_id HAVING min(product_capacities.price) limit $from,$limit;";
                }else{
                    $sql = "select products.id, model, screen, CPU, VGA, OS, RAM, background, discount, product_capacities.price, quantity from brands inner join products on brands.id=products.brand_id inner join product_capacities on products.id = product_capacities.product_id WHERE brands.name like '%".$categoryName."%' GROUP by product_capacities.product_id HAVING min(product_capacities.price) limit $from,$limit;";
                };
                $data = executeResult($sql);
                $dataRes = array("pagination" => array("currentPage" => $page, "limit" => $limit, "totalPage" => $totalPage), "data" => $data);
                echo json_encode($dataRes);
                http_response_code(200);
            }else{
                http_response_code(203);
            }
            
        }
    }
?>