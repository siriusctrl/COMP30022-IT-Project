from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from django.db.models import Q, Sum
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse, Http404
from django.contrib.auth.mixins import  LoginRequiredMixin, PermissionRequiredMixin
from django.views import View
from django.views.generic import ListView, DetailView, CreateView, UpdateView
from django.utils.html import escape

from django.conf import settings

# Create your views here.
class ttDataView(View):
    
    def get(self, request, *args, **kwargs):
        
        return JsonResponse(
            {
                "familyName": "Nizaari",
                "familyMember": [
                    {
                        "avatar": "",
                        "LastName": "Johnson",
                        "FamilyName": "Nizaari",
                        "sex": "Male",
                        "role": "Son",
                        "color": "",
                        "gen": "0"
                    },
                    {
                        "avatar": "",
                        "LastName": "Way",
                        "FamilyName": "Nizaari",
                        "sex": "Male",
                        "role": "Father",
                        "color": "",
                        "gen": "1",
                    },
                    {
                        "avatar": "",
                        "LastName": "Luisa",
                        "FamilyName": "Pink",
                        "sex": "Female",
                        "role": "Mother",
                        "color": "",
                        "gen": "1"
                    },
                ]
            }
        )