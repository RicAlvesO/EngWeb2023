import json

with open("mapa.json") as f:
    mapa = json.load(f)

cidades = mapa["cidades"]
cidades.sort(key=lambda x: x["nome"])

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
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
    </body>
    <table> 
        <tr>

            <!--Indice-->
            <td valign="top" style="background-color: #d5bdaf;" width="13%">
                <center>
                    <h3>Indice</h3>
                </center>
                <ul style="list-style: none;">
"""

# Generate the index
for c in cidades:
    page+=f"""
                    <li>
                        <a href="#{c['id']}">{c['nome']}</a>
                    </li>
    """

page+=f"""
                </ul>
            </td>

            <td width="2%"></td>
            
            <!--Conteudo-->
            <td>
"""

for c in cidades:
    page+=f"""
                <a name="{c['id']}"></a>
                <h3>{c['nome']}</h3>
                <p><b>População:</b>{c['população']}</p>
                <p><b>Descrição:</b>{c['descrição']}</p>
                <p><b>Distrito:</b>{c['distrito']}</p>
                <h4>Ligações a partir de {c['nome']}:</h4>
                <ul style="list-style: none;">
"""

    for e in c["entrada"]:
        page+=f"""
                    <li>
                        <a href="#{e[0]}">{e[1]} ({e[2]} Km)</a>
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
                        <a href="#{e[0]}">{e[1]} ({e[2]} Km)</a>
                    </li>
"""

    page+=f"""
                </ul>
                <center>
                    <hr width="97%"/>
                </center>
    """

# End of the HTML page
page+=f"""
            </td>
        </tr>
    </table>
</html>
"""

with open("mapa.html", "w") as f:
    f.write(page)