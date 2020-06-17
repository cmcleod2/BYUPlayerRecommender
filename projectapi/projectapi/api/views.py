import pyodbc
from django.shortcuts import render
import json
import requests

# Create your views here.

from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import pyodbc

from api.models import IfThen
from api.serializers import IfThenSerializer

class IfThenList(APIView):
    '''Get all if then objects'''
    @csrf_exempt
    def get(self, request, format=None):
        cats = IfThen.objects.all()
        if request.query_params.get('title'):
            cats = cats.filter(title__contains=request.query_params.get('lineup'))
        serializer = IfThenSerializer(cats, many=True)
        return Response(serializer.data)

    @csrf_exempt
    def post(self, request, format=None):
        serializer = IfThenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'POST', ])
def getPlayerRecommendation(request):

    requestlineup = str(request.body)
    requestlineup = requestlineup.replace("b", "")
    requestlineup = requestlineup.replace('"', "")
    requestlineup = requestlineup.replace("'", "")
    requestlist = requestlineup.split(';')

    #print(requestlist)
    #print(IfThen.objects.count())

    results = []

    for item in IfThen.objects.all():
        if requestlist[0] in item.lineup and requestlist[1] in item.lineup and requestlist[2] in item.lineup and requestlist[3] in item.lineup:
            #print('WE FOUND IT', item.lineup)
            newlist = {'Lineup': item.lineup, 'Player': item.player, 'Conf': item.conf, 'Lift': item.lift}
            results.append(newlist)

    newresults = sorted(results, key=lambda i:i['Lift'])

    #print(newresults)

    return Response({"result": newresults})