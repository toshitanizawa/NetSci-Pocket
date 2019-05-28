#! /usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask

app = Flask(__name__)

import netsci_pocket.views
