

Connect-PnPOnline -Url https://democompass.sharepoint.com/ -Interactive

Add-PnPCustomAction -Name "SPFxListViewCommandSet" -Title "SPFxListViewCommandSet" -RegistrationId "100" -RegistrationType "List" -Location "ClientSideExtension.ListViewCommandSet.CommandBar" -ClientSideComponentId "ab44ec8d-5c5d-46f5-84b6-7640394a278f"



# <CustomAction
# Title="SPFxListViewCommandSet"
# RegistrationId="100"
# RegistrationType="List"
# Location="ClientSideExtension.ListViewCommandSet.CommandBar"
# ClientSideComponentId="5fc73e12-8085-4a4b-8743-f6d02ffe1240"
# ClientSideComponentProperties="{&quot;sampleTextOne&quot;:&quot;One item is selected in the list.&quot;, &quot;sampleTextTwo&quot;:&quot;This command is always visible.&quot;}">
# </CustomAction>