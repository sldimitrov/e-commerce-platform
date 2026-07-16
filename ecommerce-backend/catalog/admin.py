from django.contrib import admin
from .models import Category, ProductVariant, Product, Inventory

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    pass

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    pass