from django.db import models

class Cliente(models.Model):
    idcliente = models.AutoField(primary_key=True)
    dui = models.CharField(max_length=12, blank=True, null=True)
    nombre_cliente = models.CharField(max_length=1024)
    direccion = models.CharField(max_length=1024, blank=True, null=True)
    telefono = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        db_table = 'cliente'

    def __str__(self):
        return self.nombre_cliente

class Cuenta(models.Model):
    idcuenta = models.AutoField(primary_key=True)
    codigo_cuenta = models.CharField(max_length=1024)
    tipocuenta = models.CharField(max_length=1024)
    nombre_cuenta = models.CharField(max_length=1024)

    class Meta:
        db_table = 'cuenta'
    
    def __str__(self):
        return self.nombre_cuenta

class Librodiario(models.Model):
    iddiario = models.AutoField(primary_key=True)
    idcuenta = models.ForeignKey('Cuenta', models.DO_NOTHING, db_column='idcuenta')
    fecha_registro = models.DateField()
    concepto = models.CharField(max_length=1024)
    cargo = models.BooleanField()
    monto = models.DecimalField(max_digits=30, decimal_places=10)

    class Meta:
        db_table = 'librodiario'
    
    def __str__(self):
        return self.concepto

class Libromayor(models.Model):
    idmayor = models.AutoField(primary_key=True)
    idcuenta = models.ForeignKey('Cuenta', models.DO_NOTHING, db_column='idcuenta')
    sum_debe = models.DecimalField(max_digits=30, decimal_places=10)
    sum_haber = models.DecimalField(max_digits=30, decimal_places=10)
    saldo = models.DecimalField(max_digits=30, decimal_places=10)

    class Meta:
        db_table = 'libromayor'
    
    def __str__(self):
        return self.saldo

class Periodo(models.Model):
    idperiodo = models.AutoField(primary_key=True)
    fechainicio = models.DateField()
    fechafin = models.DateField()
    activo = models.BooleanField()

    class Meta:
        db_table = 'periodo'

class Proveedor(models.Model):
    idproveedor = models.AutoField(primary_key=True)
    nrc = models.CharField(max_length=1024)
    razon_social = models.CharField(max_length=1024)
    contacto = models.CharField(max_length=8)
    estado = models.BooleanField()

    class Meta:
        db_table = 'proveedor'
    
    def __str__(self):
        return self.razon_social

class Usuario(models.Model):
    iduser = models.AutoField(primary_key=True)
    apellido_user = models.CharField(max_length=1024)
    email = models.CharField(max_length=1024)
    passwrd = models.CharField(max_length=1024)
    nombre_user = models.CharField(max_length=1024)

    class Meta:
        db_table = 'usuario'
    
    def __str__(self):
        return self.nombre_user