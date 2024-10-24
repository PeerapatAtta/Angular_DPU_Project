import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { AccountLoginUserComponent } from './components/account-login-user/account-login-user.component';
import { AccountRegisterUserComponent } from './components/account-register-user/account-register-user.component';

export const routes: Routes = [
    {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
    },
    {
        path: 'product',
        title: 'product',
        children: [
            {
                path: 'list',
                title: 'product list',
                component: ProductListComponent
            },
            {
                path: ':id/detail',
                title: 'Product Detail',
                component: ProductDetailComponent,
            },
            {
                path: 'add',
                title: 'Add Product',
                component: ProductAddComponent,
            },
            {
                path: ':id/edit',
                title: 'Edit Product',
                component: ProductEditComponent,
                //canActivate: [authGuard, sellerGuard]
            },
            {
                path: ':id/delete',
                title: 'Delete Product',
                component: ProductDeleteComponent,
                //canActivate: [authGuard, sellerGuard]
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
        ]
    },
    {
        path: 'category',
        title: 'category',
        component: CategoryComponent,
    },

    {
        path: 'user',
        title: 'User',
        component: UserComponent,
    },
    {
        path: 'cart',
        title: 'Cart',
        component: CartComponent,
    },
    {
        path: 'favorite',
        title: 'Favorite',
        component: FavoriteComponent,
    },
    {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent
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
