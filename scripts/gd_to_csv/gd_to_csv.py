# prepare the input_filename by:
	# * visiting the Google Doc - https://docs.google.com/spreadsheets/d/1X7E_XqBs7Pdlb7KDUG8g4jkDY3lfHj4AJV0LRYF2VQE/edit?ts=5e82a237#gid=0
	# * navigating to the "Mutual Aid Networks - North American Mutual Aid Networks" tab
	# * ...and downloading that single tab as a CSV, then placing in the same directory as this script

import csv
import sys
import datetime

# CONFIG

input_filename = 'Mutual Aid Networks - North American Mutual Aid Networks.csv'

license_filename = 'pddl_license.txt'

# remainder of filename will be added programatically
output_filename_prefix = 'NA_Mutual_Aid_Networks'

columns_to_keep = [
	'Resource',
	'Neighborhood/region',
	'City',
	'State/Territory',
	'Zip Code',
	'Country',
	'Language(s)',
	'General',
	'Support Request',
	'Support Offer',
	'Social Media',
	'Hotline #'
]


# splits a string 'string' into chunks of length 'length'
def chunkstring(string, length):
	return (string[0+i:length+i] for i in range(0, len(string), length))


output_rows = []
output_rows.append(columns_to_keep)

print(f'Reading from: {input_filename}')

with open(input_filename, mode='r', encoding='utf-8-sig') as csv_file:
	csv_reader = csv.DictReader(csv_file)
	line_count = 0

	for row in csv_reader:

		# skip the row with the contact message
		if line_count != 0:

			# perform checks
			if (
				not row['General'].strip()
				and not row['Support Request'].strip()
				and not row['Support Offer'].strip()
				and not row['Social Media'].strip()
			):

				print(f'Row {line_count+2} missing links; skipping ({row["Resource"]})')

			else:
				temp_row = []

				for col in columns_to_keep:
					temp_row.append(row[col])

				output_rows.append(temp_row)


		line_count += 1

	print(f'Read {line_count} lines.')


output_filename = output_filename_prefix + '_' + datetime.datetime.now().strftime("%Y-%m-%d") + '.csv'

with open(output_filename, mode='w', encoding='utf-8-sig', newline='') as output_file:
	output_writer = csv.writer(output_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

	# open the license file and prepend the output CSV with it
	# Excel has a per-cell character limit of 32,767 characters, so split the license file by slightly less than that
	license = open(license_filename, 'r')
	for chunk in chunkstring(license.read(), 32766):
		output_writer.writerow([chunk])

	# insert timestamp
	timestamp_text = "File generated on " + datetime.datetime.utcnow().strftime("%Y-%m-%d %I:%M:%S%p") + " UTC from https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vRks16AM9mtiFCCdEJmckD9IszC7rHkvfRj6xxspMB4BBB8n_SiUsHCfbHbDCixmvNGTSPm7PEii2nP/pubhtml?fbclid=IwAR0PpL_w_WOjsh0UaYiMA7aO3JqXxhl3B89dL35NU8Jk6E_n2HoRJkW-Zbg#"
	output_writer.writerow([timestamp_text])
	
	# insert blank row between header rows and content
	output_writer.writerow([])

	for row in output_rows:
		output_writer.writerow(row)

	
	print(f'Wrote {len(output_rows)} lines to file: {output_filename}')

