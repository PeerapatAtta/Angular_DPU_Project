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
            }
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
