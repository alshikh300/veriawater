function domain(){
    return('https://veriawater.com/');
    
}
//-----------------------------------------------------------------------------------------------------------
function validateNull (input,msg){
    if (input==""){
        alert(msg);
        return false;
    }
    else{
        return true;
    }
}
//-----------------------------------------------------------------------------------------------------------
function validateLen (input,msg,minLength){
    if (input.length<minLength){
        alert(msg);
        return false;
    }
    else{
        return true;
    }
}
//-----------------------------------------------------------------------------------------------------------
function validateMatch (input1,input2,msg){
    if (input1!=input2){
        alert(msg);
        return false;
    }
    else{
        return true;
    }
}
//-----------------------------------------------------------------------------------------------------------
function user_save(){
       
        var y="https://veriawater.com/webservices/user_save.php";
        var x2=$('#mobile').val();
        var x3=$('#name').val();
        var x4=$('#address').val();
        
        if(
        validateNull($('#mobile').val(),"رقم الجوال مطلوب") &&
        validateNull($('#name').val(),"الاسم مطلوب") &&
        validateNull($('#address').val(),"العنوان مطلوب")
        )
        {
                $('#loginform').html("<img src='img/loader.gif' style='margin-top:50%;' />");
                $.ajax({
                type: "GET",
                url: y,
                data: {mobile:x2,name:x3,address:x4},
                dataType: "json",
                success: function(res) {
                if(res.name=='nouser'){
                    
                    alert("بيانات خاطئة");
                    window.location.href='account.html';
                }
                else{
                    alert("تم الحفظ");
                    localStorage.setItem("login",'true');
                    localStorage.setItem("user_mobile",res.mobile);
                    localStorage.setItem("user_id",res.id);
                    localStorage.setItem("user_name",res.name);
                    localStorage.setItem("user_address",res.address);
                    
                }
                }
                });  
            
        }
        
        
}
//-----------------------------------------------------------------------------------------------------------
function forgetPass(){
    var y=domain()+"webservices/forget.php";
    var x=prompt("أدخل بريدك الالكتروني المسجل");
    if(x==null || x==""){
        alert("البريد مطلوب")
    }
    else{
        $.ajax({
        type: "GET",
        url: y,
        data: {email:x},
        dataType: "json",
        success: function(res) {
        if(res.name=='nouser'){
            
            alert("البريد الالكتروني غير مسجل لدينا");
            
        }
        else{
            alert("تم ارسال بيانات الدخول الى بريدك الالكتروني");
        }
        }
        });  
    }
}
//-----------------------------------------------------------------------------------------------------------
function register(){
        var y=domain()+"webservices/register.php";
        var x1=$('#Co').val();
        var x2=$('#Username').val();
        var x3=$('#Password').val();
        var x4=$('#Mobile').val();
        var x5=$('#Email').val();
        var x6=$('#Req_no').val();
        if(
        validateNull($('#Username').val(),"اسم المستخدم مطلوب") &&
        validateNull($('#Co').val(),"اسم المنشأة مطلوب") &&
        validateNull($('#Password').val(),"كلمة المرور مطلوبة") &&
        validateLen($('#Password').val(),"كلمة المرور اقل من 8 حروف",8) &&
        validateNull($('#ConfirmPassword').val(),"تأكيد كلمة المرور") &&
        validateMatch($('#Password').val(),$('#ConfirmPassword').val(),"كلمة المرور غير متطابقة") &&
        validateNull($('#Mobile').val(),"رقم الجوال مطلوب") &&
        validateNull($('#Email').val(),"البريد الالكتروني مطلوب") &&
        validateNull($('#Req_no').val(),"رقم السجل التجاري مطلوب") &&
        validateLen($('#Req_no').val(),"رقم السجل غير صحيح",10)
        ){
            $('#register_form').html("<img src='img/loader.gif' style='margin-top:50%;' />");
            $.ajax({
            type: "GET",
            url: y,
            data: {
            co:x1,
            username:x2,
            password:x3,
            mobile:x4,
            email:x5,
            req_no:x6
            },
            dataType: "json",
            success: function(res) {
            if(res.name=='nouser'){
                
                alert("Invalid  Login");
            }
            else{
                localStorage.setItem("login",'true');
                localStorage.setItem("user_type",res.type);
                localStorage.setItem("user_id",res.id);
                localStorage.setItem("user_name",res.name);
                window.location.href='myaccount.html';
            }
            }
            });
        }
        
}
//-----------------------------------------------------------------------------------------------------------
function logout(){
    localStorage.removeItem("login");
    window.location.href='intro.html';
}
//-----------------------------------------------------------------------------------------------------------
$(document).ready(function(){
    var x=localStorage.getItem("login");
    if(x=='true'){
        $('#user_btn_holder').html('<a href="#" data-panel="left" class="open-panel"><img src="images/user.png" alt="" title="" /></a>');
    }
    else{
        $('#user_btn_holder').html('<a href="#" data-popup=".popup-login" class="open-popup"><img src="images/user.png" alt="" title="" /></a>');
    }
})
//-----------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
    var y=domain()+"webservices/cats.php";
    $('#cats').html("<img src='img/loader.gif'  />");
       $.ajax({
        type: "GET",
        url: y,
        data: {},
        dataType: "html",
        success: function(res) {
        $('#cats').html(res);
        }
        });  
})
//------------------------------------------------------------------------------------------------------------------------
function viewCat(cat_id){
    sessionStorage.setItem("cat", cat_id);
    $('#cats').html("<img src='img/loader.gif'  />");
    window.location.href='category.html';
}
//-----------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
    var y=domain()+"webservices/category.php";
    var z=sessionStorage.getItem("cat");
    $('#products').html("<img src='img/loader.gif' width='75%'  />");
       $.ajax({
        type: "GET",
        url: y,
        data: {cat:'1'},
        dataType: "html",
        success: function(res) {
        $('#products').html(res);
        }
        });  
})
$(document).ready(function(){
    var y=domain()+"webservices/category.php";
    var z=sessionStorage.getItem("cat");
    $('#products2').html("<img src='img/loader.gif' width='75%'  />");
       $.ajax({
        type: "GET",
        url: y,
        data: {cat:'2'},
        dataType: "html",
        success: function(res) {
        $('#products2').html(res);
        }
        });  
})
//------------------------------------------------------------------------------------------------------------------------
function viewProduct(pro_id){
    sessionStorage.setItem("product", pro_id);
    $('#products').html("<img src='img/loader.gif' width='75%'  />");
    window.location.href='product.html';
}
//-----------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
    var y=domain()+"webservices/product.php";
    var z=sessionStorage.getItem("product");
    $('#product').html("<img src='img/loader.gif'  />");
       $.ajax({
        type: "GET",
        url: y,
        data: {id:z},
        dataType: "html",
        success: function(res) {
        $('#product').html(res);
        }
        });  
})
//-----------------------------------------------------------------------------------------------------------------------
$(document).on("click",".add",function(){
    var y=domain()+"webservices/cart.php";
    var z=$(this).attr('rel');
    var w=localStorage.getItem("session_id");
    $.ajax({
        type: "GET",
        url: y,
        data: {product:z,user:w},
        dataType: "html",
        success: function(res) {
        //---
        }
        });
    
})
//------------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
   if(!localStorage.getItem("session_id")){
    localStorage.setItem("session_id",Math.floor(Math.random() * (1000000 - 10000)) + 10000);
   }
})
//------------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
    var y=domain()+"webservices/cart_list.php";
    var z=localStorage.getItem("session_id");
    $('#product').html("<img src='img/loader.gif'  />");
       $.ajax({
        type: "GET",
        url: y,
        data: {user:z},
        dataType: "html",
        success: function(res) {
        $('#cart_list').html(res);
        }
        });  
})
//-----------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
    var y=domain()+"webservices/getbanners.php";
    $('#slideshow').html("<img src='img/loader.gif' width='100'  />");
       $.ajax({
        type: "GET",
        url: y,
        data: {},
        dataType: "html",
        success: function(res) {
        $('#slideshow').html(res);
        }
        });  
})
//-----------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
    var y=domain()+"webservices/getzones.php";
    
       $.ajax({
        type: "GET",
        url: y,
        data: {},
        dataType: "html",
        success: function(res) {
        $('#zone').html(res);
        }
        });  
})
//-----------------------------------------------------------------------------------------------------------------------
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    return('Connection type: ' + states[networkState]);
}
if(checkConnection()=='No network connection'){
    alert(checkConnection());
}