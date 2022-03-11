Connect-PnPOnline -Url https://democompass.sharepoint.com/ -Interactive

Get-PnPWeb  

Grant-PnPAzureADAppSitePermission -AppId 2533e8aa-78ae-4f49-8ff2-e3ad1def219a -DisplayName 'DavidsApp' -Site 'https://democompass.sharepoint.com/sites/CompassTest/' -Permissions Write


Get-PnPAzureADAppSitePermission -Site https://democompass.sharepoint.com

# Revoke-PnPAzureADAppSitePermission -PermissionId "aTowaS50fG1zLnNwLmV4dHwyNTMzZThhYS03OGFlLTRmNDktOGZmMi1lM2FkMWRlZjIxOWFANDQ1ZDI0NDctNzk4Yi00Yzk3LWJjMTQtMmU1NjgwNDJkMmYz"

Connect-PnPOnline -Url https://democompass.sharepoint.com -ClientId  2533e8aa-78ae-4f49-8ff2-e3ad1def219a -Thumbprint 55AADA5711DC09000286E43231931090BD134533 -Tenant democompass.onmicrosoft.com


$list = Get-PnPList "SiteRequest"
$listItem = Get-PnPListItem "SiteRequest" -Id 2

$ctx = Get-PnPContext

$listItem["Title"] = "testPSsdfsdfsdf"
$listItem.UpdateOverwriteVersion()

Invoke-PnPQuery

Get-PnPUser # -Identity "david@democompass.onmicrosoft.com"

$listItem["Editor"] = 6
$listItem.UpdateOverwriteVersion()
Invoke-PnPQuery


New-PnPSiteGroup -Name "test" -PermissionLevels "Full Control"