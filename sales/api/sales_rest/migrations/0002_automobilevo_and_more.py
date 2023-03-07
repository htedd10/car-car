# Generated by Django 4.0.3 on 2023-03-07 02:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=17, unique=True)),
            ],
        ),
        migrations.RenameField(
            model_name='customer',
            old_name='phoneNumber',
            new_name='phone_number',
        ),
        migrations.CreateModel(
            name='Salerecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sales_price', models.BigIntegerField()),
                ('automobile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='salerecords', to='sales_rest.automobilevo')),
                ('salesperson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='sales_rest.salesperson')),
            ],
        ),
    ]
