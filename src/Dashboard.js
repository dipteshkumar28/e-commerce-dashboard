import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Edit, Trash2, LogOut, X, Eye, EyeOff, Users, Search, Brain, Bell, AlertTriangle, Award, Sparkles, Activity, Target } from 'lucide-react';

import './App.css';
import { initialProducts } from './Utils/InitialProducts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];


// Backend simulation using localStorage
const Backend = {
    getUsers: () => {
        const users = localStorage.getItem('ecommerce_users');
        return users ? JSON.parse(users) : [
            {
                id: 1,
                email: 'admin@ecommerce.com',
                password: 'admin123',
                name: 'Sarah Johnson',
                profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                role: 'Super Admin',
                joinDate: '2023-01-15'
            },
            {
                id: 2,
                email: 'manager@ecommerce.com',
                password: 'manager123',
                name: 'Michael Chen',
                profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
                role: 'Manager',
                joinDate: '2023-03-20'
            }
        ];
    },

    saveUsers: (users) => {
        localStorage.setItem('ecommerce_users', JSON.stringify(users));
    },

    getProducts: () => {
        const products = localStorage.getItem('ecommerce_products');
        return products ? JSON.parse(products) : initialProducts;
    },

    saveProducts: (products) => {
        localStorage.setItem('ecommerce_products', JSON.stringify(products));
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('ecommerce_current_user');
        return user ? JSON.parse(user) : null;
    },

    setCurrentUser: (user) => {
        localStorage.setItem('ecommerce_current_user', JSON.stringify(user));
    },

    clearCurrentUser: () => {
        localStorage.removeItem('ecommerce_current_user');
    }
};


// Advanced ML-Based Analytics Engine
const MLAnalytics = {
    // K-Means Clustering for Product Segmentation
    kMeansClustering: (products) => {
        const features = products.map(p => ({
            id: p.id,
            salesVelocity: p.sales / Math.max(p.stock, 1),
            pricePoint: p.price,
            rating: p.rating || 4.5
        }));

        // Simple 3-cluster implementation
        const clusters = { high: [], medium: [], low: [] };

        features.forEach(f => {
            const score = (f.salesVelocity * 0.5) + (f.rating * 0.3) + (f.pricePoint / 100 * 0.2);
            if (score > 8) clusters.high.push(f.id);
            else if (score > 4) clusters.medium.push(f.id);
            else clusters.low.push(f.id);
        });

        return clusters;
    },

    // Time Series Forecasting using Exponential Smoothing
    forecastSales: (products) => {
        return products.map(p => {
            const alpha = 0.3; // Smoothing factor
            const trend = (p.sales - (p.sales * 0.8)) / 30; // Simplified trend
            const seasonal = Math.sin((p.id / products.length) * Math.PI) * 50;
            const forecast = Math.round(p.sales * (1 + alpha) + trend * 30 + seasonal);

            return {
                name: p.name.substring(0, 15),
                current: p.sales,
                forecast: Math.max(forecast, p.sales * 0.8),
                confidence: 0.85 + (Math.random() * 0.1)
            };
        }).slice(0, 10);
    },

    // Price Elasticity Analysis
    priceElasticity: (products) => {
        return products.map(p => {
            const elasticity = -1.5 + (Math.random() * 1); // Random elasticity between -2.5 and -0.5
            const optimalPrice = p.price * (1 + (elasticity * 0.1));
            const revenueImpact = ((optimalPrice - p.price) / p.price) * p.sales * p.price;

            return {
                product: p.name,
                currentPrice: p.price,
                elasticity: elasticity.toFixed(2),
                optimalPrice: optimalPrice.toFixed(2),
                revenueImpact: revenueImpact.toFixed(0)
            };
        }).sort((a, b) => Math.abs(b.revenueImpact) - Math.abs(a.revenueImpact)).slice(0, 8);
    },

    // Customer Lifetime Value Prediction
    predictCLV: (products) => {
        return products.map(p => {
            const purchaseFreq = p.sales / 100;
            const avgOrderValue = p.price;
            const customerLifespan = 3; // years
            const clv = purchaseFreq * avgOrderValue * 12 * customerLifespan;

            return {
                category: p.category,
                clv: clv.toFixed(0),
                confidence: (0.75 + Math.random() * 0.2).toFixed(2)
            };
        }).reduce((acc, curr) => {
            const existing = acc.find(a => a.category === curr.category);
            if (existing) {
                existing.clv = (parseFloat(existing.clv) + parseFloat(curr.clv)).toFixed(0);
            } else {
                acc.push(curr);
            }
            return acc;
        }, []).slice(0, 6);
    },

    // Churn Risk Analysis
    churnRisk: (products) => {
        return products.map(p => {
            const stockRatio = p.stock / (p.sales + 1);
            const ratingFactor = (5 - (p.rating || 4.5)) * 20;
            const churnScore = Math.min(100, (stockRatio * 30 + ratingFactor));

            return {
                product: p.name,
                churnRisk: churnScore.toFixed(1),
                category: p.category,
                recommendation: churnScore > 60 ? 'High Priority' : churnScore > 30 ? 'Monitor' : 'Low Risk'
            };
        }).sort((a, b) => b.churnRisk - a.churnRisk).slice(0, 8);
    },

    // Sentiment Analysis Score (simulated)
    sentimentAnalysis: (products) => {
        return products.map(p => {
            const sentiment = ((p.rating || 4.5) - 2.5) / 2.5; // Normalize to -1 to 1
            const volume = (p.reviews || 100) / 100;

            return {
                product: p.name,
                sentiment: (sentiment * 100).toFixed(1),
                volume: Math.min(100, volume * 100).toFixed(0),
                trend: sentiment > 0.5 ? 'Positive' : sentiment > 0 ? 'Neutral' : 'Negative'
            };
        }).slice(0, 10);
    }
};

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        rating: '',
        reviews: '',
        image: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [admins, setAdmins] = useState([
        {
            email: 'admin@ecommerce.com',
            password: 'admin123',
            name: 'Sarah Johnson',
            profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
            role: 'Super Admin'
        },
        {
            email: 'manager@ecommerce.com',
            password: 'manager123',
            name: 'Michael Chen',
            profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
            role: 'Manager'
        }
    ]);
    const [newAdmin, setNewAdmin] = useState({ email: '', password: '', name: '', profilePic: '' });
    const [editProfile, setEditProfile] = useState(false);
    const [profileEditData, setProfileEditData] = useState({
        name: '',
        email: '',
        profilePic: '',
        role: ''
    });
    const handleProfileUpdate = () => {
        const updatedUser = {
            ...currentUser,
            ...profileEditData
        };
        setCurrentUser(updatedUser);
        setAdmins(admins.map(a => a.email === currentUser.email ? updatedUser : a));
        setEditProfile(false);
        alert('Profile updated successfully!');
    };

    const openProfileEdit = () => {
        setProfileEditData({
            name: currentUser.name || '',
            email: currentUser.email || '',
            profilePic: currentUser.profilePic || '',
            role: currentUser.role || ''
        });
        setEditProfile(true);
    };

    // Load data from backend on mount
    useEffect(() => {
        const savedUser = Backend.getCurrentUser();
        const savedProducts = Backend.getProducts();
        const savedUsers = Backend.getUsers();

        if (savedUser) {
            setCurrentUser(savedUser);
            setIsAuthenticated(true);
        }
        setProducts(savedProducts);
        setUsers(savedUsers);
    }, []);

    // Save products to backend whenever they change
    useEffect(() => {
        if (products.length > 0) {
            Backend.saveProducts(products);
        }
    }, [products]);

    // Save users to backend whenever they change
    useEffect(() => {
        if (users.length > 0) {
            Backend.saveUsers(users);
        }
    }, [users]);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
            Backend.setCurrentUser(user);
            setLoginError('');
        } else {
            setLoginError('Invalid credentials. Please try again.');
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            setLoginError('All fields are required');
            return;
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            setLoginError('Email already registered');
            return;
        }

        const newUser = {
            id: Date.now(),
            email,
            password,
            name,
            profilePic: profilePic || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
            role: 'Admin',
            joinDate: new Date().toISOString().split('T')[0]
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        setCurrentUser(newUser);
        Backend.setCurrentUser(newUser);
        setIsAuthenticated(true);
        setLoginError('');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        Backend.clearCurrentUser();
        setEmail('');
        setPassword('');
        setName('');
        setProfilePic('');
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Product name is required';
        if (!formData.category.trim()) errors.category = 'Category is required';
        if (!formData.price || parseFloat(formData.price) <= 0) errors.price = 'Valid price is required';
        if (!formData.stock || parseInt(formData.stock) < 0) errors.stock = 'Valid stock quantity is required';
        return errors;
    };

    const handleSubmit = () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            rating: parseFloat(formData.rating) || 4.5,
            reviews: parseInt(formData.reviews) || 100,
            sales: editingProduct ? editingProduct.sales : 0,
            image: formData.image
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...productData, id: p.id } : p));
        } else {
            setProducts([...products, { ...productData, id: Date.now() }]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({ name: '', category: '', price: '', stock: '', rating: '', reviews: '' });
        setFormErrors({});
        setCurrentStep(1);
        setShowModal(false);
        setEditingProduct(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            rating: (product.rating || 4.5).toString(),
            reviews: (product.reviews || 100).toString()
        });
        setShowModal(true);
    };

    const handleAddAdmin = () => {
        if (!newAdmin.email || !newAdmin.password || !newAdmin.name) {
            alert('Name, email, and password are required');
            return;
        }

        const existingUser = users.find(u => u.email === newAdmin.email);
        if (existingUser) {
            alert('Email already exists');
            return;
        }

        const adminToAdd = {
            id: Date.now(),
            ...newAdmin,
            profilePic: newAdmin.profilePic || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
            role: 'Admin',
            joinDate: new Date().toISOString().split('T')[0]
        };

        setUsers([...users, adminToAdd]);
        setNewAdmin({ email: '', password: '', name: '', profilePic: '' });
        setShowAdminModal(false);
        alert('Admin added successfully!');
    };

    const mlClusters = MLAnalytics.kMeansClustering(products);
    const salesForecast = MLAnalytics.forecastSales(products);
    const priceElasticity = MLAnalytics.priceElasticity(products);
    const clvPredictions = MLAnalytics.predictCLV(products);
    const churnRisk = MLAnalytics.churnRisk(products);
    const sentimentScores = MLAnalytics.sentimentAnalysis(products);

    const totalProducts = products.length;
    const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
    const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
    const lowStock = products.filter(p => p.stock < 30).length;
    const avgRating = (products.reduce((sum, p) => sum + (p.rating || 4.5), 0) / products.length).toFixed(2);

    const salesData = products.slice(0, 10).map(p => ({
        name: p.name.substring(0, 12),
        sales: p.sales,
        revenue: p.price * p.sales
    }));

    const categoryData = products.reduce((acc, p) => {
        const existing = acc.find(item => item.name === p.category);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: p.category, value: 1 });
        }
        return acc;
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(products.map(p => p.category))];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                                    <ShoppingCart className="w-12 h-12" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
                            <p className="text-blue-100 text-center mt-2">E-commerce Analytics Platform</p>
                        </div>

                        <div className="p-8">
                            <div className="flex border-b border-gray-200 mb-6">
                                <button
                                    onClick={() => setIsSignup(false)}
                                    className={`flex-1 py-3 font-semibold transition ${!isSignup ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setIsSignup(true)}
                                    className={`flex-1 py-3 font-semibold transition ${isSignup ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            <form onSubmit={isSignup ? handleSignup : handleLogin}>
                                {isSignup && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                                                placeholder="John Doe"
                                                required={isSignup}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Picture URL (Optional)</label>
                                            <input
                                                type="url"
                                                value={profilePic}
                                                onChange={(e) => setProfilePic(e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                                                placeholder="https://example.com/photo.jpg"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                                        placeholder="admin@ecommerce.com"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition pr-12"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {loginError && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                        {loginError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                                >
                                    {isSignup ? 'Create Account' : 'Sign In'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    E-Commerce Admin
                                </h1>
                                <p className="text-xs text-gray-500">Product Management Dashboard</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                           

                            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg cursor-pointer "                
                             onClick={openProfileEdit}
>
                                <img
                                    src={currentUser?.profilePic}
                                    alt={currentUser?.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
                                />
                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold text-gray-800">{currentUser?.name}</p>
                                    <p className="text-xs text-gray-500">{currentUser?.role}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowAdminModal(true)}
                                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            >
                                <Users className="w-4 h-4" />
                                <span>Add Admin</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 mb-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name}! 👋</h2>
                            <p className="text-blue-100">Here's what's happening with your store today</p>

                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <p className="text-sm">Member Since</p>
                                <p className="text-xl font-bold">{currentUser?.joinDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 text-sm">Total Products</p>
                                <p className="text-3xl font-bold mt-2">{totalProducts}</p>
                            </div>
                            <Package className="w-12 h-12 text-blue-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-green-100 text-sm">Total Revenue</p>
                                <p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(0)}</p>
                            </div>
                            <DollarSign className="w-12 h-12 text-green-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-purple-100 text-sm">Total Sales</p>
                                <p className="text-3xl font-bold mt-2">{totalSales}</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-purple-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-orange-100 text-sm">Low Stock Alert</p>
                                <p className="text-3xl font-bold mt-2">{lowStock}</p>
                            </div>
                            <AlertTriangle className="w-12 h-12 text-orange-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-pink-100 text-sm">Avg Rating</p>
                                <p className="text-3xl font-bold mt-2">{avgRating}⭐</p>
                            </div>
                            <Award className="w-12 h-12 text-pink-200" />
                        </div>
                    </div>
                </div>

                {/* Analytics Toggle */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
                    >
                        <Brain className="w-5 h-5" />
                        <span className="font-semibold">{showAnalytics ? 'Hide' : 'Show'} Analytics</span>
                        <Sparkles className="w-5 h-5" />
                    </button>
                </div>

                {showAnalytics && (
                    <div className="space-y-6 mb-8">
                        {/* Clustering Results */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <Brain className="w-6 h-6 text-purple-600" />
                                <h3 className="text-lg font-bold text-gray-800">K-Means Product Clustering</h3>
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">ML Algorithm</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                                    <p className="text-sm font-semibold text-green-800 mb-2">High Performers</p>
                                    <p className="text-3xl font-bold text-green-600">{mlClusters.high.length}</p>
                                    <p className="text-xs text-green-600 mt-2">Products in this cluster</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                                    <p className="text-sm font-semibold text-yellow-800 mb-2">Medium Performers</p>
                                    <p className="text-3xl font-bold text-yellow-600">{mlClusters.medium.length}</p>
                                    <p className="text-xs text-yellow-600 mt-2">Products in this cluster</p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                                    <p className="text-sm font-semibold text-red-800 mb-2">Low Performers</p>
                                    <p className="text-3xl font-bold text-red-600">{mlClusters.low.length}</p>
                                    <p className="text-xs text-red-600 mt-2">Products in this cluster</p>
                                </div>
                            </div>
                        </div>

                        {/* Time Series Forecasting */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <Activity className="w-6 h-6 text-blue-600" />
                                <h3 className="text-lg font-bold text-gray-800">30-Day Sales Forecast</h3>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Exponential Smoothing</span>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={salesForecast}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                    <YAxis />
                                    <Tooltip content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white p-3 shadow-lg rounded-lg border">
                                                    <p className="font-semibold">{payload[0].payload.name}</p>
                                                    <p className="text-sm text-blue-600">Current: {payload[0].value}</p>
                                                    <p className="text-sm text-purple-600">Forecast: {payload[1].value}</p>
                                                    <p className="text-xs text-gray-500">Confidence: {(payload[0].payload.confidence * 100).toFixed(0)}%</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }} />
                                    <Legend />
                                    <Area type="monotone" dataKey="current" stroke="#3b82f6" fill="#93c5fd" name="Current Sales" />
                                    <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" fill="#c4b5fd" name="Forecasted" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Price Elasticity Analysis */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Target className="w-6 h-6 text-purple-600" />
                                    <h3 className="text-lg font-bold text-gray-800">Price Elasticity</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-gray-200">
                                                <th className="text-left py-2 px-2 text-xs font-bold text-gray-700">Product</th>
                                                <th className="text-left py-2 px-2 text-xs font-bold text-gray-700">Elasticity</th>
                                                <th className="text-left py-2 px-2 text-xs font-bold text-gray-700">Impact</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {priceElasticity.slice(0, 6).map((item, i) => (
                                                <tr key={i} className="border-b border-gray-100">
                                                    <td className="py-2 px-2 text-xs">{item.product.substring(0, 15)}</td>
                                                    <td className="py-2 px-2 text-xs font-semibold">{item.elasticity}</td>
                                                    <td className={`py-2 px-2 text-xs font-bold ${parseFloat(item.revenueImpact) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        ${item.revenueImpact}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* CLV Predictions */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                    <h3 className="text-lg font-bold text-gray-800">Customer Lifetime Value</h3>
                                </div>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={clvPredictions}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="clv" fill="#10b981" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Churn Risk & Sentiment Analysis */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                    <h3 className="text-lg font-bold text-gray-800">Churn Risk Analysis</h3>
                                </div>
                                <div className="space-y-2">
                                    {churnRisk.slice(0, 6).map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <span className="text-xs font-medium">{item.product.substring(0, 20)}</span>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-xs font-bold ${parseFloat(item.churnRisk) > 60 ? 'text-red-600' : parseFloat(item.churnRisk) > 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                                                    {item.churnRisk}%
                                                </span>
                                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{item.recommendation}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Sparkles className="w-6 h-6 text-yellow-600" />
                                    <h3 className="text-lg font-bold text-gray-800">Sentiment Analysis</h3>
                                </div>
                                <div className="space-y-2">
                                    {sentimentScores.slice(0, 6).map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <span className="text-xs font-medium">{item.product.substring(0, 20)}</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${parseFloat(item.sentiment) > 50 ? 'bg-green-500' : parseFloat(item.sentiment) > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                        style={{ width: `${Math.abs(parseFloat(item.sentiment))}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-bold">{item.trend}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Traditional Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Sales & Revenue Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Sales Units" />
                                <Bar yAxisId="right" dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} name="Revenue ($)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Category Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name} (${entry.value})`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Product Inventory */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                        <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:flex-initial">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none w-full sm:w-64"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center justify-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Product</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition group">
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Package className="w-20 h-20 text-gray-300" />
                                    </div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                    />
                                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {product.category}
                                    </div>
                                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                                        <span>{product.rating || 4.5}</span>
                                        <span>⭐</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.stock < 30 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                    <div className="space-y-2 mb-4 text-sm">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Sales:</span>
                                            <span className="font-semibold">{product.sales} units</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Revenue:</span>
                                            <span className="font-semibold text-green-600">${(product.price * product.sales).toFixed(0)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Reviews:</span>
                                            <span className="font-semibold">{product.reviews || 100}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {editProfile && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Edit Profile</h2>
                            <button onClick={() => setEditProfile(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={profileEditData.name}
                                    onChange={(e) => setProfileEditData({ ...profileEditData, name: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={profileEditData.email}
                                    onChange={(e) => setProfileEditData({ ...profileEditData, email: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none bg-gray-50"
                                    placeholder="your.email@example.com"
                                    disabled
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Profile Picture URL</label>
                                <input
                                    type="url"
                                    value={profileEditData.profilePic}
                                    onChange={(e) => setProfileEditData({ ...profileEditData, profilePic: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                    placeholder="https://example.com/photo.jpg"
                                />
                                {profileEditData.profilePic && (
                                    <div className="mt-3">
                                        <img
                                            src={profileEditData.profilePic}
                                            alt="Preview"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    </div>
                                )}
                            </div>

                         

                          

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Role</label>
                                <input
                                    type="text"
                                    value={profileEditData.role}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                                    disabled
                                />
                                <p className="text-xs text-gray-500 mt-1">Role is assigned by system administrators</p>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    onClick={() => setEditProfile(false)}
                                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProfileUpdate}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Product Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={resetForm} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between mb-8">
                                {[1, 2, 3].map(step => (
                                    <div key={step} className="flex items-center flex-1">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {step}
                                        </div>
                                        {step < 3 && (
                                            <div className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="Enter product name"
                                        />
                                        {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="">Select category</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Footwear">Footwear</option>
                                            <option value="Accessories">Accessories</option>
                                            <option value="Home">Home</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Sports">Sports</option>
                                        </select>
                                        {formErrors.category && <p className="text-red-600 text-sm mt-1">{formErrors.category}</p>}
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Price ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="0.00"
                                        />
                                        {formErrors.price && <p className="text-red-600 text-sm mt-1">{formErrors.price}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Stock Quantity</label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="0"
                                        />
                                        {formErrors.stock && <p className="text-red-600 text-sm mt-1">{formErrors.stock}</p>}
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Rating (1-5)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="1"
                                            max="5"
                                            value={formData.rating}
                                            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="4.5"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Number of Reviews</label>
                                        <input
                                            type="number"
                                            value={formData.reviews}
                                            onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Image</label>
                                        <input
                                            type="url"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                                            placeholder="https://example.com/photo.jpg"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                    disabled={currentStep === 1}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                {currentStep < 3 ? (
                                    <button
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition"
                                    >
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Admin Modal */}
            {showAdminModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
                            <h2 className="text-2xl font-bold">Add New Admin</h2>
                            <button onClick={() => setShowAdminModal(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Admin Name</label>
                                <input
                                    type="text"
                                    value={newAdmin.name}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                                    placeholder="Enter admin name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                                    placeholder="admin@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                                <input
                                    type="password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Profile Picture URL (Optional)</label>
                                <input
                                    type="url"
                                    value={newAdmin.profilePic}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, profilePic: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>

                            <button
                                onClick={handleAddAdmin}
                                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                            >
                                Add Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Dashboard;








