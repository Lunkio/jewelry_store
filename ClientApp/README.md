## Post Mortem Creations, e-commerce

This is an e-commerce website for selling hand-made jewelry. 
This project was made for independent jewelry-maker, and the aim was to provide a platform, 
where the seller (admin) can manage all the products, paying customers and bought items via website’s admin -section.
To use the admin -section, a unique username and password are needed. 
Once logged in, admin can add new jewelries by setting a price, jewelry's description, type of the jewelry and uploading an image from admin's computer.
Added jewelries can be deleted afterwards. 

Customers can add products to cart and purchase them via PayPal.
Payment can't be made, unless customer provides all the necessary information during checkout.
When a customer buys an item/items, they are automatically removed from the selling items list 
and a new entry for the bought items is created, which includes all the information of the customer and bought items for the admin to see.

### `Up-to-date database`

All the products are stored in a database (SQL Server), inlcuding buyer's details once a payment is made. All the information
in the database is kept up-to-date, so one specific product can't be
accidentally purchased by another buyer simultaneously. Checkout process checks database before accepting the payment.

### `Missing features`

Website is missing a contact/about page, which will be added once the information from the jewelry maker is received and confirmed.
Also, Paypal is currently only in sandbox mode, so no real payments can’t be made yet.