import json
import sys

def main(arg):
    with open(arg, 'r') as f:
        data=json.load(f)

    id=0
    for d in data['pessoas']:
        d['id']='p'+str(id)
        id+=1

    with open(arg[:-5]+"_fixed.json", 'w') as f:
        f.write(json.dumps(data, indent=4)) 

if __name__ == '__main__':
    arg=sys.argv[1]
    main(arg)