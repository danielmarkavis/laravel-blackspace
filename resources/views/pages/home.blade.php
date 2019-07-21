@extends('layouts.app')

@section('content')
    <div>
        <h1>Blackspace!</h1>
        <h4><a href="{{route('overview')}}">New Game</a></h4>
    </div>
@endsection

@section('scripts')
    @parent
@endsection
