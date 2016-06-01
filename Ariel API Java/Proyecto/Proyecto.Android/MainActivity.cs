using Android.App;
using Android.OS;
using Android.Views;
using Android.Webkit;
using Android.Widget;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Proyecto.Android
{
    public class Donacion
    {
        public int userId { get; set; }
        public int id { get; set; }
        public string title { get; set; }
        public string body { get; set; }
    }

    [Activity(Label = "Proyecto.Android", MainLauncher = true, Icon = "@drawable/icon")]
    public class MainActivity : Activity
    {
        int count = 1;

        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Main);

            // Get our button from the layout resource,
            // and attach an event to it
            Button button = FindViewById<Button>(Resource.Id.MyButton);

            button.Click += delegate { button.Text = string.Format("{0} clicks!", count++); };

            //Task.WaitAny(RefreshDataAsync());

            var client = new RestClient("http://jsonplaceholder.typicode.com/");
            var request = new RestRequest("posts", Method.GET);

            //var client = new RestClient("http://localhost:60067/api/");
            //var request = new RestRequest("Donacion", Method.GET);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var listData = client.Execute<List<Donacion>>(request).Data;

            WebView webview = FindViewById<WebView>(Resource.Id.webView1);

            WebSettings settings = webview.Settings;
            settings.JavaScriptEnabled = true;
            webview.ScrollBarStyle = ScrollbarStyles.OutsideOverlay;


            webview.SetWebViewClient(new WebViewClient()
            {
            });
            webview.LoadUrl("http://www.google.com");
        }

        public async Task<List<Donacion>> RefreshDataAsync()
        {
            List<Donacion> Items = new List<Donacion>();
            HttpClient client = new HttpClient();
            //var uri = new Uri(string.Format("http://localhost:60067/api/Donacion", string.Empty));
            var uri = new Uri(string.Format("http://jsonplaceholder.typicode.com/posts", string.Empty));

            try
            {
                var response = await client.GetAsync(uri);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    Items = JsonConvert.DeserializeObject<List<Donacion>>(content);
                }
            }
            catch (Exception ex)
            {
            }

            return Items;
        }
    }
}

