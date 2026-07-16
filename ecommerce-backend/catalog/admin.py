from django.contrib import admin
from .models import Category, ProductVariant, Product, Inventory

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent',)
    search_fields = ('name',)
    list_filter = ('parent',)
    ordering = ('name',)
    fields = ('name', 'parent')


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'sku', 'price', 'color', 'dimensions',)
    search_fields = ('sku', 'product__name', 'color')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name',)
    list_filter = ('created_at',)
    ordering = ('name',)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('quantity',)
