IF DB_ID('RSMS2_DB') IS NULL
    CREATE DATABASE RSMS2_DB;
GO

USE RSMS2_DB;
GO

CREATE TABLE Users
(
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Password NVARCHAR(100) NOT NULL,
    Role NVARCHAR(20) NOT NULL
);
GO

CREATE TABLE Owners
(
    OwnerID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    Email NVARCHAR(100) NULL,
    Address NVARCHAR(200) NULL
);
GO

CREATE TABLE Customers
(
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    Email NVARCHAR(100) NULL,
    Address NVARCHAR(200) NULL,
    CustomerType NVARCHAR(20) NOT NULL
);
GO

CREATE TABLE Properties
(
    PropertyID INT IDENTITY(1,1) PRIMARY KEY,
    PropertyName NVARCHAR(100) NOT NULL,
    PropertyType NVARCHAR(50) NOT NULL,
    Location NVARCHAR(100) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(20) NOT NULL,
    OwnerID INT NOT NULL,
    Description NVARCHAR(300) NULL,
    CONSTRAINT FK_Properties_Owners FOREIGN KEY (OwnerID) REFERENCES Owners(OwnerID)
);
GO

CREATE TABLE Rentals
(
    RentalID INT IDENTITY(1,1) PRIMARY KEY,
    PropertyID INT NOT NULL,
    CustomerID INT NOT NULL,
    RentAmount DECIMAL(18,2) NOT NULL,
    Deposit DECIMAL(18,2) NOT NULL DEFAULT 0,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    PaymentStatus NVARCHAR(20) NOT NULL,
    CONSTRAINT FK_Rentals_Properties FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID),
    CONSTRAINT FK_Rentals_Customers FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
GO

CREATE TABLE Sales
(
    SaleID INT IDENTITY(1,1) PRIMARY KEY,
    PropertyID INT NOT NULL,
    BuyerID INT NOT NULL,
    SalePrice DECIMAL(18,2) NOT NULL,
    PaidAmount DECIMAL(18,2) NOT NULL DEFAULT 0,
    Balance AS (SalePrice - PaidAmount),
    SaleDate DATE NOT NULL,
    PaymentStatus NVARCHAR(20) NOT NULL,
    CONSTRAINT FK_Sales_Properties FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID),
    CONSTRAINT FK_Sales_Customers FOREIGN KEY (BuyerID) REFERENCES Customers(CustomerID)
);
GO

CREATE TABLE Payments
(
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL,
    PropertyID INT NOT NULL,
    PaymentType NVARCHAR(20) NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL,
    PaidAmount DECIMAL(18,2) NOT NULL,
    RemainingBalance AS (TotalAmount - PaidAmount),
    PaymentDate DATE NOT NULL,
    Note NVARCHAR(300) NULL,
    CONSTRAINT FK_Payments_Customers FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    CONSTRAINT FK_Payments_Properties FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID)
);
GO

INSERT INTO Users (Username, Password, Role) VALUES
('admin', 'admin123', 'Admin'),
('manager', 'manager123', 'Manager'),
('user1', 'user123', 'User');
GO

INSERT INTO Owners (FullName, Phone, Email, Address) VALUES
('Mohamed Abdirahman Ahmed', '+252610000001', 'mohamed@example.com', 'Hodan, Mogadishu'),
('Amina Hassan Ali', '+252610000002', 'amina@example.com', 'Waberi, Mogadishu'),
('Ali Omar Yusuf', '+252610000003', 'ali@example.com', 'Hamarweyne, Mogadishu');
GO

INSERT INTO Customers (FullName, Phone, Email, Address, CustomerType) VALUES
('Abdi Mohamed Noor', '+252615111111', 'abdi@example.com', 'Hodan, Mogadishu', 'Tenant'),
('Fadumo Ahmed Hassan', '+252615222222', 'fadumo@example.com', 'Wadajir, Mogadishu', 'Buyer'),
('Hassan Ali Warsame', '+252615333333', 'hassan@example.com', 'Karaan, Mogadishu', 'Tenant');
GO

INSERT INTO Properties (PropertyName, PropertyType, Location, Price, Status, OwnerID, Description) VALUES
('Dahab Tower Apartment A1', 'Apartment', 'Hodan, Mogadishu', 450.00, 'Available', 1, 'Modern apartment near main road'),
('City View House', 'House', 'Waberi, Mogadishu', 750.00, 'Available', 2, 'Family house with parking area'),
('Hamar Business Shop', 'Shop', 'Hamarweyne, Mogadishu', 1200.00, 'Available', 3, 'Commercial shop suitable for business'),
('KM4 Modern Flat', 'Apartment', 'KM4, Mogadishu', 350.00, 'Available', 1, 'Modern flat available for booking');
GO

INSERT INTO Rentals (PropertyID, CustomerID, RentAmount, Deposit, StartDate, EndDate, PaymentStatus) VALUES
(1, 1, 450.00, 100.00, '2026-01-01', '2026-12-31', 'Partial'),
(2, 3, 750.00, 200.00, '2026-02-01', '2026-08-01', 'Paid');
GO

UPDATE Properties SET Status='Rented' WHERE PropertyID IN (1,2);
GO

INSERT INTO Sales (PropertyID, BuyerID, SalePrice, PaidAmount, SaleDate, PaymentStatus) VALUES
(3, 2, 50000.00, 20000.00, '2026-03-15', 'Partial');
GO

UPDATE Properties SET Status='Sold' WHERE PropertyID=3;
GO

INSERT INTO Payments (CustomerID, PropertyID, PaymentType, TotalAmount, PaidAmount, PaymentDate, Note) VALUES
(1, 1, 'Rent', 450.00, 300.00, '2026-01-05', 'January rent partial payment'),
(3, 2, 'Rent', 750.00, 750.00, '2026-02-05', 'February rent full payment'),
(2, 3, 'Sale', 50000.00, 20000.00, '2026-03-15', 'Initial sale payment');
GO

select * from Users
