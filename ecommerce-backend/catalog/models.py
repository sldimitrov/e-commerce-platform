from django.db import models
from core.models import TimeStampedModel


class Category(TimeStampedModel):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.PROTECT)

    def __str__(self):
        return self.name

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'parent'],
                name="unique_category_per_parent"
            )
        ]


class Product(TimeStampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    slug = models.SlugField(unique=True)
    categories = models.ManyToManyField(Category, related_name='products')

    def __str__(self):
            return self.name


class ProductVariant(TimeStampedModel):
    product = models.ForeignKey(Product, related_name='variants', on_delete=models.CASCADE)
    sku = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=100, blank=True, null=True, default='')
    dimensions = models.CharField(max_length=100)

    def __str__(self):
        return self.product.name


class Inventory(TimeStampedModel):
    variant = models.ForeignKey(ProductVariant, related_name='inventories', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.variant.sku} ({self.quantity})"