## Requirements to create a site collection app catalog
# Existing global app catalog must exist
# may need admin consent

Connect-PnPOnline -Url https://democompass.sharepoint.com/ -Interactive

Add-PnPSiteCollectionAppCatalog 

