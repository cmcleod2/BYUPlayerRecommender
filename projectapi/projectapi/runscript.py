#!/usr/bin/env python3

# initialize django
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'projectapi.settings'
import django
django.setup()

from api.models import IfThen
import json

# main script
def main():    
    # Have to create the Categories first then give each objects category an actual category object 
    with open('NEWIfThen.json') as json_file:
        data = json.load(json_file)
    ifthen = data

    for info in ifthen:
        dbprod = IfThen()
        dbprod.lineup = info['if']
        dbprod.player = info['then']
        dbprod.conf = info['confidence']
        dbprod.lift = info['lift']
        dbprod.save()


    for info in IfThen.objects.all():
        print(info.lineup, info.player, info.conf, info.lift)


# bootstrap
if __name__ == '__main__':
    main()