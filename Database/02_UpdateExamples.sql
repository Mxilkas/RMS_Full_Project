USE RSMS2_DB;
GO

UPDATE Users SET Password='newadmin123', Role='Admin' WHERE UserID=1;
UPDATE Owners SET Phone='+252619999999', Email='updated.owner@example.com', Address='Hodan District, Mogadishu' WHERE OwnerID=1;
UPDATE Customers SET Phone='+252618888888', CustomerType='Tenant' WHERE CustomerID=1;
UPDATE Properties SET Price=500.00, Status='Rented', Description='Updated apartment information' WHERE PropertyID=1;
UPDATE Rentals SET RentAmount=500.00, Deposit=150.00, EndDate='2026-12-31', PaymentStatus='Paid' WHERE RentalID=1;
UPDATE Sales SET PaidAmount=35000.00, PaymentStatus='Partial' WHERE SaleID=1;
UPDATE Payments SET PaidAmount=450.00, Note='Rent payment completed' WHERE PaymentID=1;
GO

SELECT * FROM Users;
SELECT * FROM Owners;
SELECT * FROM Customers;
SELECT * FROM Properties;
SELECT * FROM Rentals;
SELECT * FROM Sales;
SELECT * FROM Payments;
GO
