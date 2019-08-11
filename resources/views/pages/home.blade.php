@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-12 text-center my-5">
                <h1>Blackspace!</h1>
                <h4><a href="{{route('overview')}}">New Game</a></h4>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    @parent
@endsection
