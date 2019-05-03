# CSCI3916_Final_Project
CSCI3916 Final Project. This program can collect reviews from App Store and provides suitable response for each review based on Review Rating (1-5⭐️).

## 🚓🚨Development Policy:

### Please DO NOT WORK WITH MASTER DIRECTLY.

1. Clone Master Branch.
2. Do needed work.
3. Create you own branch (OLEKSIY/STORY NAME).
4. Commit your work to your dev branch. 
5. Create pull request into MASTER
6. ASK Someone to review and test you Branch
7. If everything ok, Merge DEV Branch into MASTER. If something is broken, REVIEWER should request changes.

## ✏️Summary:
  
Ideally, we want to have website where authorized user can login and input app name/app id from App Store and see all reviews. User should be able to sort reviews by date (since App Store does not provide the date when review got posted we can just sort it by latest or oldest using unique review id), rating, app version. Reviews will be stored in DB as well.
	
Additionally, we will have pre-canned  responses stored in our Mongo DB so user will be able to easily get suitable response to the review based on user rating.
	
We also want only authorized users use our app, so we will have signing and signup functions for user. It also will prevent unauthorized to mess with our DB. If we will be able to do it, as a feature, we can add restriction so that only users from US can register and user our app. And we will restrict other countries.
	
We also want to be able to get new reviews from app store and add them to our DB. The cool way to do it is to check new reviews in App Store daily, but I think if we will have button to check them manually when user wants it will be ok too.  

Example of reviews we are going to work with. 
``https://itunes.apple.com/rss/customerreviews/id=407358186/sortBy=mostRecent/json``

## 🚀 Contributors 🛠:
  Oleksiy Pobyeda, 
  Yves Nsenga, 
  James Knight, 
  Murat Siyfiyev, 
  Jinbiao Lian, 
  Alberta Nepali. 
