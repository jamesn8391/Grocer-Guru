# Grocer-Guru
# Overall, this project is a grocery store recommender. We primarily used Vue, as well as API calls to ChatGPT and SerpAPI.
# The first thing that a user would do is enter their grocery list onto the website.
# Once the user finishes entering their items, and selects the "Find best Price" button.
# From there, we call SerpAPI, and 11 options for each item in the grocery list is searched and stored.
# For the first three grocery items inputted, we query ChatGPT by calling the ChatGPT API to find the best three options out of the eleven based on the "best deal".
# Next, there is a pop up where the user will calibrate their preferences. They will choose one of the three options for each of the groceries based on the results from the previous query.
# After the user makes their choices, we query ChatGPT again. The query we give ChatGPT decides what store the user should go to based on their previous selections.
# After the store is decided, it will give a list of the groceries they should buy from that store.
