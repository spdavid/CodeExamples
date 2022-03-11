dotnet new sln -n CustomFunc
dotnet new classlib -o CustomFunc.Common --framework "net6.0"
dotnet sln CustomFunc.sln add CustomFunc.Common\CustomFunc.Common.csproj

func init CustomFunc.Functions --dotnet
dotnet sln CustomFunc.sln add CustomFunc.Functions\CustomFunc_Functions.csproj

dotnet new console -o CustomFunc.Tests --framework "net6.0"
dotnet sln CustomFunc.sln add CustomFunc.Tests\CustomFunc.Tests.csproj

cd CustomFunc.Tests
dotnet add reference ../CustomFunc.Common/CustomFunc.Common.csproj

And for functions

npm install -g azure-functions-core-tools@4 --unsafe-perm true

dotnet add package PnP.Framework --version 1.8.0

dotnet add projects.workbench/projects.workbench.csproj reference projects.common/projects.common.csproj