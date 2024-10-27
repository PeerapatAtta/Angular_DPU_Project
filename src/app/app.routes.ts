import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { AccountLoginUserComponent } from './components/account-login-user/account-login-user.component';
import { AccountRegisterUserComponent } from './components/account-register-user/account-register-user.component';
import { authGuard } from './guards/auth.guard';
import { sellerGuard } from './guards/seller.guard';
import { AccountForgotPasswordComponent } from './components/account-forgot-password/account-forgot-password.component';
import { AccountResetPasswordComponent } from './components/account-reset-password/account-reset-password.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserEditProfileComponent } from './components/user-edit-profile/user-edit-profile.component';


export const routes: Routes = [
    {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
    },
    {
        path: 'category',
        title: 'Category',
        children: [
            {
                path: 'list',
                title: 'Category list',
                component: CategoryListComponent,
                canActivate: [authGuard]
            },
            {
                path: ':id/detail',
                title: 'Category Detail',
                component: CategoryDetailComponent,
                canActivate: [authGuard]
            },
            {
                path: 'add',
                title: 'Add Category',
                component: CategoryAddComponent,
                canActivate: [authGuard]
            },
            {
                path: ':id/edit',
                title: 'Edit Category',
                component: CategoryEditComponent,
                // canActivate: [authGuard, sellerGuard]
            },
            {
                path: ':id/delete',
                title: 'Delete Category',
                component: CategoryDeleteComponent,
                canActivate: [authGuard]
            },
        ]
    },
    {
        path: 'product',
        title: 'product',
        children: [
            {
                path: 'list',
                title: 'product list',
                component: ProductListComponent,
                canActivate: [authGuard]
            },
            {
                path: ':id/detail',
                title: 'Product Detail',
                component: ProductDetailComponent,
                canActivate: [authGuard]
            },
            {
                path: 'add',
                title: 'Add Product',
                component: ProductAddComponent,
                canActivate: [authGuard]
            },
            {
                path: ':id/edit',
                title: 'Edit Product',
                component: ProductEditComponent,
                canActivate: [authGuard]
            },
            {
                path: ':id/delete',
                title: 'Delete Product',
                component: ProductDeleteComponent,
                canActivate: [authGuard]
            },
        ]
    },
    {
        path: 'favorite',
        title: 'favorite',
        children: [
            {
                path: 'list',
                title: 'favorite list',
                component: FavoriteListComponent,
                canActivate: [authGuard]
            },
        ]
    },
    {
        path: 'cart',
        title: 'cart',
        children: [
            {
                path: 'list',
                title: 'cart list',
                component: CartListComponent,
                canActivate: [authGuard]
            },
        ]
    },
    {
        path: 'account',
        children: [
            {
                path: 'login',
                title: 'Login',
                component: AccountLoginUserComponent
            },
            {
                path: 'register',
                title: 'Register',
                component: AccountRegisterUserComponent
            },
            {
                path: 'forgotpassword',
                title: 'Forgot Password',
                component: AccountForgotPasswordComponent
            },
            {
                path: 'resetpassword',
                title: 'Reset Password',
                component: AccountResetPasswordComponent
            }
        ]
    },
    {
        path: 'user',
        title: 'user',
        children: [
            {
                path: 'list',
                title: 'user list',
                component: UserListComponent,
                canActivate: [authGuard]
            },
            {
                path: ':id/detail',
                title: 'User Detail',
                component: UserProfileComponent,
                canActivate: [authGuard]
            },
            {
                path: ':id/edit',
                title: 'User edit',
                component: UserEditProfileComponent,
                canActivate: [authGuard]
            },
        ]
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent
    },
    {
        path: '', // default route คือ การกำหนด route ที่จะแสดงเมื่อไม่มีการระบุ path ใดๆ
        pathMatch: 'full', // pathMatch: 'full' คือ การกำหนดว่า path นี้จะต้องตรงกับ path ที่ระบุใน path ทั้งหมด
        redirectTo: 'home',
    },
    {
        path: '**', // wildcard route คือ การกำหนด route ที่ไม่มีในรายการ route ทั้งหมด
        redirectTo: 'home',
    }
];
