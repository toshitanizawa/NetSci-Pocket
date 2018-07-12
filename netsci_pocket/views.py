from netsci_pocket import app
from flask import Flask, render_template, jsonify, request, url_for

# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Directory for JSON files
# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
json_root = './netsci_pocket/static/jsons/'

# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Top view
# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

# json file serving
@app.route('/jsons/<jsonfn>')
def json_file_serve(jsonfn):
    # json_root = url_for('static', filename='jsons/')
    json_f = open(json_root + jsonfn, 'r')
    contents = json_f.read()
    return contents

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Network Science Basics
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@app.route('/network_science_top')
def network_science_top():
    return render_template('network_science_top.html')

# --- displaying network examples ---
@app.route('/show_jpg/<jpg_file_name>')
def show_jpg(jpg_file_name):
    url_for_img_file = url_for('static', filename='images/' + jpg_file_name)

    if jpg_file_name == '2003-blackoutmap-copy.jpg':
        title = u'Blackout in North America on Aug 14, 2003'
        exp_text = u'The fourteenth of August in 2003 in the northeastern part of the USA including NYC was a really hot and humid day. A single failure in a power transmission system triggered an avalanche of malfunction in the whole transmission system in this area that lead to a 29-hour blackout.'
    elif jpg_file_name == 'TokyoMetro.jpg':
        title = u'Network of Tokyo Metro'
        exp_text = u'Tokyo is an international megalopolis with a complicated network of subway system. Despite this complexity, Tokyo Metro is famous for the punctuality of the operation.'
    elif jpg_file_name == 'Zacharys_karate_club.jpg':
        title = u'Zachary\'s Karate Club'
        exp_text = u'This is one of the most famous networks of human relationship in social science.'
    elif jpg_file_name == 'UAL_World_2014_07_01.jpg':
        title = u'World Flight Map of United Airlines'
        exp_text = u'This is the international flight route map of the United Airlines in 2014.'
    elif jpg_file_name == 'Worldcup_2006_final_ITA_FRA.jpg':
        title = u'Network formed by Passes in the Final Game of the FIFA World Cup 2006, Italy vs France'
        exp_text = u'This a network formed by the routes of passing the ball in the final game of FIFA World Cup in 2006, Italy (Blue, Left) vs France (Yellow, Right). The thickness and the darkness of the arrows are proportional to the number of the passes.'
    elif jpg_file_name == 'brain_nw.jpg':
        title = u'Neuron Network of the Human Brain'
        exp_text = u'This is one of the most complex networks on the globe, the neuron network of the human brain.'
    elif jpg_file_name == 'internet_map.jpg':
        title = u'Network formed by Autonomous Systems on the Internet'
        exp_text = u'The Internet is a huge computer network made up from a large amount of interconnected local area networks of universities, laboratories, public services, and service providers.'
    elif jpg_file_name == 'www_nw.jpg':
        title = u'Linkage Network between Pages on the World Wide Web'
        exp_text = u'This is a network consisting of hyperlink relationship between web pages in a domain in the Internet.'
    elif jpg_file_name == 'microchip_series_2Poly.jpg':
        title = u'Electrical Circuit as a Network'
        exp_text = u'A modern electrical circuit is PRINTED on a substrait.'
    elif jpg_file_name == 'co_authorship_nw.jpg':
        title = u'Network formed by Co-authorship of Scientific Papers'
        exp_text = u'This is a network of co-authorship of scientific papers in a research field. Each node represents an author and a link between nodes represents co-authorship.'
    elif jpg_file_name == 'tender.jpg':
        title = u'Network formed by an English Word "tender"'
        exp_text = u'This is a network formed by words associated or used with an English word "tender".'
    elif jpg_file_name == 'sp_data_school_day_1_g.jpg':
        title = u'Social Network formed by Pupils of an Elementary School'
        exp_text = u'Each node in this network is an individual child in an elementary school. A link between nodes indicates that there is a close relationship between them. The node colors represent the classes to which children belong.'
    elif jpg_file_name == 'london_gps_trace.jpg':
        title = u'Road Network traced by GPS in Downtown London'
        exp_text = u'This is a network formed by accumulated signals from moving cars in the downtown of London traced by the Global Positioning System representing the road map of London.'
    else:
        title = "Unknown"
        exp_text = "Undefined"

    return render_template('network_example_topic.html', title=title, exp_text=exp_text, url_for_img_file=url_for_img_file)

# +++ network science basics +++
@app.route('/net_sci_basics/<topic>')
def net_sci_basics(topic):

    if topic == 'points_and_lines':
        title = u'Nodes and Edges'
        javascript_src = url_for('static', filename='js/miserables.js')
        side_text = u'A network is made up from "nodes (or vertices)" and "edges (or links)". This network represents the relationship between the characters in a famous French novel, "Les Miserables".  If you put the arrow of the mouse on a node in this network, the name of the character pops up. You can drag any nodes with the mouse.'
        previous_page = '/network_science_top'
        next_page = '/net_sci_basics/lattice'
    elif topic == 'lattice':
        title = u'Regular Lattices'
        javascript_src = url_for('static', filename = 'js/lattice.js')
        side_text = u'This network is a "two-dimensional square lattice" made of 64 nodes. Road maps in urban areas have structures similar to square lattices.'
        previous_page = '/net_sci_basics/points_and_lines'
        next_page = '/net_sci_basics2/ba'
    elif topic == 'scale_free':
        title = u'Scale-free Networks'
        javascript_src = url_for('static', filename = 'js/ba.js')
        side_text = u'The network in the right is made up from 64 nodes generated by the Barabasi-Albert algorithm. The group of networks that share similar properties of this network is called the "scale-free network".  At this point, can you guess the difference between the networks in Group A and Group B we previously introduced as examples of networks in the real world? You can revisit the web page that contains the list of these networks by clicking "Network Science?" in the navigation bar at the top of this web page.'
        previous_page = '/net_sci_basics2/ba'
        next_page = '/net_sci_basics2/node_degree'
    else:
        title = u'Unknown'
        javascript_src = url_for('static', filename='js/miserables.js')

    return render_template('network_science_basics.html', title=title, javascript_src=javascript_src, side_text=side_text, previous_page=previous_page, next_page=next_page)

@app.route('/net_sci_basics2/node_degree')
def net_sci_basics2_node_degree():
    title = u'Degree of Nodes'
    javascript_src = url_for('static', filename = 'js/node_degree.js')
    return render_template('net_sci_basics_node_degree.html', title=title, javascript_src=javascript_src)

@app.route('/net_sci_basics2/degree_distribution')
def net_sci_basics2_degree_distribution():
    title = u'Degree Distribution'
    javascript_src = url_for('static', filename = 'js/degree_dist.js')
    return render_template('net_sci_basics_degree_dist.html', title=title, javascript_src=javascript_src)

@app.route('/net_sci_basics2/ba')
def net_sci_basics2_ba():
    title = u'Barabasi-Albert Model'
    javascript_src = url_for('static', filename = 'js/barabasi_albert.js')
    return render_template('net_sci_basics_BA.html', title=title, javascript_src=javascript_src)

@app.route('/net_sci_basics2/shortest_path', methods=['GET', 'POST'])
def net_sci_basics2_shortest_path():

    javascript_src = url_for('static', filename = 'js/shortest_path.js')

    return render_template('net_sci_basics_shortest_path.html', javascript_src=javascript_src)



# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# network structure
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@app.route('/network_struct_top')
def network_struct_top():
    return render_template('network_struct_top.html')

@app.route('/network_struct/avr_path_length')
def net_struct_avr_path_length():

    title = u'Average Distance in a Network'
    javascript_src = url_for('static', filename = 'js/large_nw_avr_path_length.js')

    return render_template('network_struct_avr_path_l.html', title=title, javascript_src=javascript_src)

@app.route('/network_struct/avr_path_trial')
def net_struct_avr_path_trial():

    title = u'Distance between Nodes in a Large Network'
    javascript_src = url_for('static', filename = 'js/path_length_trial.js')

    return render_template('network_struct_avr_path_trial.html', title=title, javascript_src=javascript_src)


# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# misc
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@app.route('/misc_top')
def misc_top():
    return render_template('misc_top.html')


# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# PyCX Top page
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@app.route('/pycx')
def pycx():
    return render_template('pycx.html')

# PyCX Topic pages
#-------------------------------------------------------------------

# *** ds_bifurcationdiagram ***
@app.route('/ds_bifurcationdiagram', methods=['GET', 'POST'])
def ds_bifurcationdiagram():
    from netsci_pocket.pycx.ds_bifurcationdiagram import InputForm, draw

    form = InputForm(request.form)
    if request.method == 'POST' and form.validate():
        result = draw(form.x0.data, int(form.samplingStartTime.data), int(form.sampleNumber.data))
    else:
        result = None

    return render_template('pycx_topic.html', form=form, result=result, title="DS: Bifurcation Diagram")

# +++++++ The End of the script +++++++++++++++++++++++++++++++++++++
