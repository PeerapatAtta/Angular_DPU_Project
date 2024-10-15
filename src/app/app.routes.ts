import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
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
        path: 'register',
        title: 'Register',
        component: RegisterComponent
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];
