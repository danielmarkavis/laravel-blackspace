<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container">
        <a class="navbar-brand" href="{{ url('/') }}">
            {{ config('app.name', 'Blackspace') }}
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            @auth
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active"><a class="nav-link" href="{{ route('overview') }}">Overview</a></li>
                <li class="nav-item active"><a class="nav-link" href="{{ route('galaxy') }}">Galaxy</a></li>
                <li class="nav-item active"><a class="nav-link" href="{{ route('system') }}">System</a></li>
            </ul>
            @endauth
        </div>
    </div>
</nav>
