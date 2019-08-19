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

class FuckIndexView(View):
    template_name = "inn.html"

    def get(self, request):
        return render(request, self.template_name)