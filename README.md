# JuiceBot
An economy bot made for the Juice Team!

## Commands
This section will go over commands, parameters and their responses.

# Admin commands.

`juiceboard` - Will upload a txt file with the entire Balances table (UserID, Juice, lastRedeemed)

`list <item> <qty> <juice>` - Lists an item to the treasury. Eg: `list NFT1 10 100` will list Item NFT1 for 100 Juice and there are 10 available for purchase.
Parameters:
<item> - single continuous string
<qty> - whole number
<juice> - any integer

`editcost <item> <juice>` - Edits the price of an existing item in the shop to the new price specified. eg, `editcost NFT1 50` will update NFT1 with the new cost of 40 Juice.
Parameters:
<item> - Single continous string of item already in shop
<juice> - Integer for new price.
NOTE: `editcost` and `edit` can both be used for this command (`edit` is an aliases)

`restock <item> <qty>` - Adds stock to an item in the treasury. Eg, `restock NFT1 5` will update NFT1 with it's current quantity + 5.
Parameters:
<item> - Single continous string of item already in shop
<qty> - whole number

`unstock <item> <qty>` - Removes stock from an item in the treasury. Eg, `unstock NFT1 5` will update NFT1 with its current quantity - 5.
Parameters:
<item> - Single continous string of item already in shop
<qty> - whole number

`set user log <channelID>` - Sets the user logs channel to the ID specified. Eg, `set user log 850281718312206356` will set any user logs to be put in channelID 850281718312206356
Parameters:
<channelID> - The ID (snowflake) of the channel.

`set admin log <channelID>` - Sets the admin logs channel to the ID specified. Eg, `set user log 850281718312206356` will set any admin logs to be put in channelID 850281718312206356
Parameters:
<channelID> - The ID (snowflake) of the channel.

`set admin role <RoleID>` - Sets the admin role to the given role ID. Eg, `set admin role 850281718312206356` will set the admin role to RoleID 850281718312206356
Parameters:
<RoleID> - The ID (snowflake) of the role.

`set admin role <RoleID>` - Sets the admin role to the given role ID. Eg, `set admin role 850281718312206356` will set the admin role to RoleID 850281718312206356
Parameters:
<RoleID> - The ID (snowflake) of the role.

`remove admin <role>` - Removes the admin role set in config. Eg, `remove admin 850281718312206356` will remove 850281718312206356 from the config. Since roles are overwritten, if you are replacing an admin role with a new one you can just use `set admin role <role>` to replace it.
Parameters:
<RoleID> - The ID (snowflake) of the role.

`createraffle <item> <cost> <winners> <timer> <message>` - Creates a raffle and stores it in the database. Eg, `createraffle NFT1 10 1 14 Win this cool NFT!` will create a raffle for NFT1, that costs 10 Juice per entry and which 1 person can win, it will last for 14 days and has the message "Win this cool NFT!"
Parameters:
<item> - A single continuous string for the item you're raffling.
<cost> - A number of juice per entry
<winners> - The number of winners you want drawing.
<timer> - How many days you want the raffle to last for before auto-drawing.
<message> - Any characters after the <timer> parameters will be added to the message string.
Note: The raffle is autodrawn in the channel it is set in. ChannelID is grabbed from the channel the message is sent in and added to the GiveawayTBL.

`endraffle <item>` - Will manually end a raffle for the item specified and the winners drawn. Eg, `endraffle NFT1` will end the raffle for NFT1 and the number of winners specified in the GiveawayTBL will be randomly drawn and posted in the channel the endraffle command was posted in.
Parameters:
<item> - A single continous string of the item the raffle was created with.

`givejuice <user> <qty>` - Gives juice to the specified user. Eg, `givejuice 369203023760719892 500` will give 500 Juice to userID 369203023760719892.
Parameters:
<user> - A userID (snowflake)
<qty> - A number of juice.
Note: UserIDs are what identifies a user in the Database. If the user does not have a row in the Balances table, the command will error. The user must have a row in this table before this command will work. This can be done by running `juice` or `juice it`, which will generate a row for them in the Database.

`takejuice <user> <qty>` - Takes juice from the specified user. Eg, `givejuice 369203023760719892 500` will take 500 Juice from userID 369203023760719892.
Parameters:
<user> - A userID (snowflake)
<qty> - A number of juice.
Note: UserIDs are what identifies a user in the Database. If the user does not have a row in the Balances table, the command will error. The user must have a row in this table before this command will work. This can be done by running `juice` or `juice it`, which will generate a row for them in the Database.


# User Commands

`juice` - Displays the persons balance. If the person has never ran a command before - and has no row in the Database - then this will create their row with 0 juice.

`juice it` - This will add 100 juice to the persons balance if they have not been given juice 8 hours previously. If the person has never ran a command before - and has no row in the Database - then this will create their row with 100 Juice.

`treasury` - Lists all the items in the Treasury in a table. If no items are in the treasury it replies with "The treasury is busy getting juiced, come back
later."

`purcahse <item>` - Purchase an item from the Treasury to be added to your inventory. Eg, `purchase NFT1` will purchase NFT1, deduct the item cost from their balance and add +1 to their inventorys quantity.
Parameters:
<item> - A single continuous string of the item in the Treasury.

`enterraffle <item> <qty>` - Enters user into a giveaway for <item> for <amount> of entries. Eg, `enterraffle NFT1 5` will give the user 5 entries into the raffle for NFT1 as long as the users balance has enough for 5 entries (to be deducted).
Parameters:
<item> - A single continous string for the raffle Item
<qty> - Quantity of entries wanted (whole number)
Note: `enter` is also acceptable usage for this command

`inventory` - Displays the users inventory in a table. If user has no inventory, it will tell them that they do not have any items in their inventory. Each item has a "Quantity" and "Redeemed" column, when Quantity = Redeemed, the item is not Displayed as they have redeemed them all.

`claim <item>` - Claims an item in the users inventory and adds +1 to the Redeemed section of a users inventory.
Operations:
- A private channel is created with the user and ADMINROLE
- A message is sent to the ADMINLOG channel alerting them of the claim
- Adds +1 to the users redeemed column for that item
