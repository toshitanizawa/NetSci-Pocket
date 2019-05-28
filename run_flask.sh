#!/usr/bin/env bash

FLASK_APP=netsci_pocket FLASK_ENV=development python -m flask run
# For the access from global IPs, uncomment the next line
# --host=0.0.0.0
