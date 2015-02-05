#!/usr/bin/python

""" 
    starter code for exploring the Enron dataset (emails + finances) 
    loads up the dataset (pickled dict of dicts)

    the dataset has the form
    enron_data["LASTNAME FIRSTNAME MIDDLEINITIAL"] = { features_dict }

    {features_dict} is a dictionary of features associated with that person
    you should explore features_dict as part of the mini-project,
    but here's an example to get you started:

    enron_data["SKILLING JEFFREY K"]["bonus"] = 5600000
    
"""

import pickle

enron_data = pickle.load(open("../final_project/final_project_dataset.pkl", "r"))
#print enron_data["PRENTICE JAMES"]["total_stock_value"]

"""
count = 0
for person in enron_data:
	if enron_data[person]["poi"]:
		count += 1

print count
"""

count = 0
salaries = 0
eAddresses = 0
nanPayments = 0
pois = 0
for person in enron_data:
	count += 1
	if enron_data[person]["salary"] != "NaN":
		salaries += 1
	if enron_data[person]["email_address"] != "NaN":
		eAddresses += 1
	if enron_data[person]["total_payments"] == "NaN":
		nanPayments += 1
	if enron_data[person]["poi"] == True and enron_data[person]["total_payments"] == "NaN":
		pois += 1
print count
print salaries
print eAddresses
print nanPayments
print (nanPayments * 1.0) / count
print pois
print (pois * 1.0) / count
#print enron_data["COLWELL WESLEY"]['from_this_person_to_poi']
#print enron_data["SKILLING JEFFREY K"]["total_payments"]
#print enron_data["LAY KENNETH L"]["total_payments"]
#print enron_data["FASTOW ANDREW S"]["total_payments"]
#print enron_data["FASTOW ANDREW S"]