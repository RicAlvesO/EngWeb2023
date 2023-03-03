import json

with open("mapa.json") as f:
    mapa = json.load(f)

cidades = mapa["cidades"]
cidades.sort(key=lambda x: x["nome"])

dists=[]

for c in cidades:
    if c["distrito"] not in dists:
        dists.append(c["distrito"])

dists.sort()

ligacoes = mapa["ligações"]

for c in cidades:
    c["saida"] = []
    for l in [x for x in ligacoes if x["origem"] == c["id"]]:
        c["saida"].append((l["destino"],[i["nome"] for i in cidades if i["id"]==l["destino"]][0],l["distância"]))

    c["entrada"] = []
    for l in [x for x in ligacoes if x["destino"] == c["id"]]:
        c["entrada"].append((l["origem"],[i["nome"] for i in cidades if i["id"]==l["origem"]][0],l["distância"]))
    
# Begginning of the HTML page
page=f"""
<!Doctype html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8">
    </head>
    <body style="background-color: #9FCBE5;">
        <center>
            <h1>Mapa Virtual</h1>
        </center>

        <center>
            <h3>Indice</h3>
        </center>
        <table width="100%"> 
            <tr>

                <!--Indice-->
                <td valign="top" style="background-color: #CAE9FF;" width="25%">
                    <ul style="list-style: none;">
"""

i=0

# Generate the index
for d in dists:
    page+=f"""<li><h3>{d}</h3></li>"""
    for c in cidades:
        if c["distrito"]==d:
            page+=f"""
                                <li>
                                    <a href="{c['id']}">{c['nome']}</a>
                                </li>
            """
    i+=1
    if i%5==0 and i!=len(dists):
        page+=f"""
                    </ul>
                </td>


                <td valign="top" style="background-color: #CAE9FF;" width="25%">
                    <ul style="list-style: none;">
        """


page+=f"""
                    </ul>
                </td>
            </tr>
        </table>
    </body>
</html>
"""
with open("mapa.html", "w") as f:
    f.write(page)


for c in cidades:
    page=f"""
<!Doctype html>
<html>
    <head>
        <title>{c['nome']}</title>
        <meta charset="utf-8">
    </head>
    <body style="background-color: #9FCBE5;">
        <center>
            <h1>{c['nome']}</h1>
        </center>
        <p><b>População:</b>{c['população']}</p>
        <p><b>Descrição:</b>{c['descrição']}</p>
        <p><b>Distrito:</b>{c['distrito']}</p>
        <h4>Ligações a partir de {c['nome']}:</h4>
        <ul style="list-style: none;">
"""

    for e in c["entrada"]:
        page+=f"""
            <li>
                <a href="{e[0]}">{e[1]} ({e[2]} Km)</a>
            </li>
"""

    page+=f"""
        </ul>
        <h4>Ligações para {c['nome']}:</h4>
        <ul style="list-style: none;">
"""

    for e in c["saida"]:
        page+=f"""
            <li>
                <a href="{e[0]}">{e[1]} ({e[2]} Km)</a>
            </li>
"""


    # End of the HTML page
    page+=f"""
    </ul>
    <a href="/">Indice</a>
</html>
"""
    with open(f"cidades/{c['id']}.html", "w") as f:
        f.write(page)
