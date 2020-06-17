from rest_framework import serializers

from api.models import IfThen

# Serializers define the API representation.
class IfThenSerializer(serializers.ModelSerializer):
    class Meta:
        model = IfThen
        fields = [ 'lineup', 'player', 'conf', 'lift' ]