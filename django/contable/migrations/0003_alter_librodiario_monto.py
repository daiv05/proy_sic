# Generated by Django 4.0.5 on 2022-10-11 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contable', '0002_alter_libromayor_saldo_alter_libromayor_sum_debe_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='librodiario',
            name='monto',
            field=models.DecimalField(decimal_places=10, max_digits=30),
        ),
    ]
