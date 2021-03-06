App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        }
    },
    getGif: function(searchingText, callback) {
        function getUrl() {
            return new Promise(
                function(resolve, reject) {
                    const url = 'http://api.giphy.com' + '/v1/gifs/random?api_key=' + 'V5fnADF5p9n6tEEx76OiM43fAEdmdnF7' + '&tag=' + searchingText; 
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        }
                    };
                    xhr.send();
                }
            )
        }
        getUrl()
        .then(resp => {
            const data = JSON.parse(resp).data;
            let gif = { 
            url: data.fixed_width_downsampled_url, // nie rozumiem co to jest "fixed_width_downsampled_url"
            sourceUrl: data.url
            };
            callback(gif);
        })
    },


/* 
    getGif: function(searchingText, callback) { 
        var url = 'http://api.giphy.com' + '/v1/gifs/random?api_key=' + 'V5fnADF5p9n6tEEx76OiM43fAEdmdnF7' + '&tag=' + searchingText; 
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
               var data = JSON.parse(xhr.responseText).data;
                var gif = { 
                    url: data.fixed_width_downsampled_url, // nie rozumiem co to jest "fixed_width_downsampled_url"
                    sourceUrl: data.url
                };
                callback(gif);
            }
        };
        xhr.send();
    }, */

    handleSearch: function(searchingText) {
        this.setState({
            loading:true
        });
        this.getGif(searchingText, function(gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

    render: function() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search   //co to jest za twór?? 
                    onSearch={this.handleSearch}
                />
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});
