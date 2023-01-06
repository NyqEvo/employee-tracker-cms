insert into department (name)
values  ('Accounting'),
        ('Sales'),
        ('Human Resources');

insert into roles (title, salary, department_id)
values  ('Accounting Lead', 125000.00, 1),
        ('Accountant', 95000.00, 1),
        ('Sales Lead', 130000.00, 2),
        ('Salesperson', 100000.00, 2),
        ('Human Resources Supervisor', 110000, 3),
        ('Human Resources', 90000, 3);

insert into employee (first_name, last_name, role_id, manager_id)
values  ('John', 'Doe', 1, null),
        ('Jill', 'Smith', 3, null),
        ('Madison', 'Dolan', 5, null),
        ('James', 'Miller', 2, 1),
        ('Steven', 'Johnseon', 4, 2),
        ('Adam', 'Stein', 6, 3);

